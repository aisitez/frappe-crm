"""One-time fix: remove all Microsoft OAuth from Website Settings and Social Login Keys.

Run once inside the container:
  bench --site crm.localhost execute crm.fixall.execute
"""
import json
import os
import subprocess
import frappe


def execute():
    _delete_ms_social_login_keys()
    _clear_head_html()
    _set_brand_name()
    _mark_setup_complete()
    _grant_admin_crm_roles()
    _enable_signup()
    _patch_www_files()
    frappe.db.commit()
    frappe.clear_cache()
    _direct_mysql_clear_head_html()
    print("DONE: MS Social Login Keys deleted, head_html cleaned, brand set, signup enabled, caches cleared.")


def _delete_ms_social_login_keys():
    all_keys = frappe.db.sql(
        "SELECT name, provider_name FROM `tabSocial Login Key`", as_dict=True
    )
    ms_terms = ("microsoft", "office", "azure", "ms_", "office_365")
    deleted = []
    for row in all_keys:
        name_lower = (row.name or "").lower()
        prov_lower = (row.provider_name or "").lower()
        if any(t in name_lower or t in prov_lower for t in ms_terms):
            frappe.db.sql(
                "DELETE FROM `tabSocial Login Key` WHERE name=%s", (row.name,)
            )
            deleted.append(row.name)
    for fixed_name in ["microsoft", "Microsoft", "office_365", "Office 365", "azure_ad"]:
        if frappe.db.exists("Social Login Key", fixed_name):
            frappe.db.sql(
                "DELETE FROM `tabSocial Login Key` WHERE name=%s", (fixed_name,)
            )
            deleted.append(fixed_name)
    print("Deleted Social Login Keys:", deleted or "none found")


_LOGIN_HEAD_JS = (
    "<script>(function(){"
    "var p=window.location.pathname;"
    "if(p==='/logout'){window.location.replace('/login');return;}"
    "if(p!=='/login')return;"
    "function fx(){"
    "document.querySelectorAll('.page-card-head h4').forEach(function(h){"
    "h.textContent=h.textContent.replace(/Frappe CRM/g,'SentimentAI CRM').replace(/Frappe/g,'SentimentAI CRM');"
    "});"
    "var sp=document.querySelector('.for-signup .page-card');"
    "if(sp&&!document.getElementById('crm-sb')){"
    "sp.innerHTML="
    "'<div class=\"page-card-body\">"
    "<div class=\"form-group\"><input type=\"text\" id=\"crm-fn\" class=\"form-control\" placeholder=\"Full Name\" required></div>"
    "<div class=\"form-group\"><input type=\"email\" id=\"crm-em\" class=\"form-control\" placeholder=\"your@email.com\" required></div>"
    "<div class=\"form-group\"><input type=\"password\" id=\"crm-pw\" class=\"form-control\" placeholder=\"Password (min 6 chars)\" required></div>"
    "</div>"
    "<div class=\"page-card-actions\">"
    "<button id=\"crm-sb\" class=\"btn btn-sm btn-primary btn-block\">Create Account</button>"
    "<p id=\"crm-sm\" style=\"color:red;text-align:center;margin-top:8px;display:none\"></p>"
    "</div>';"
    "document.getElementById('crm-sb').onclick=function(){"
    "var n=(document.getElementById('crm-fn').value||'').trim(),"
    "e=(document.getElementById('crm-em').value||'').trim(),"
    "p=document.getElementById('crm-pw').value,"
    "m=document.getElementById('crm-sm'),b=this;"
    "m.style.display='none';"
    "if(!n||!e||!p){m.textContent='Please fill in all fields.';m.style.display='block';return;}"
    "if(p.length<6){m.textContent='Password must be at least 6 characters.';m.style.display='block';return;}"
    "b.textContent='Creating...';b.disabled=true;"
    "fetch('/api/method/crm.api.user_signup.create_account',{"
    "method:'POST',headers:{'Content-Type':'application/json'},"
    "body:JSON.stringify({full_name:n,email:e,password:p})})"
    ".then(function(r){return r.json();})"
    ".then(function(d){"
    "if(d.message&&d.message.status==='success'){window.location.href='/crm';}"
    "else{var er='Signup failed.';try{var ms=JSON.parse(d._server_messages||'[]');"
    "if(ms.length)er=JSON.parse(ms[0]).message||er;}catch(x){}"
    "m.textContent=er;m.style.display='block';b.textContent='Create Account';b.disabled=false;}})"
    ".catch(function(){m.textContent='Network error.';m.style.display='block';b.textContent='Create Account';b.disabled=false;});"
    "};}"
    "var sm=document.querySelector('.sign-up-message');"
    "if(!sm){sm=document.createElement('div');sm.className='text-center sign-up-message';sm.innerHTML=\"Don't have an account? <a href='#signup'>Sign up</a>\";var lf=document.querySelector('.form-login');if(lf&&lf.parentNode){lf.parentNode.appendChild(sm);}}"
    "if(!window.location.search.includes('redirect-to'))"
    "history.replaceState({},'','/login?redirect-to='+encodeURIComponent('/crm'));"
    "}"
    "if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fx);}else{fx();}"
    "window.addEventListener('hashchange',fx);"
    "})();</script>"
)


def _clear_head_html():
    frappe.db.sql(
        "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('Website Settings', 'head_html', %s)"
        " ON DUPLICATE KEY UPDATE `value`=%s",
        (_LOGIN_HEAD_JS, _LOGIN_HEAD_JS),
    )
    print("head_html set with SentimentAI CRM login JS.")


def _set_brand_name():
    """Set SentimentAI CRM as the app/brand name in Website Settings so all pages show correct branding."""
    fields = {
        "app_name": "SentimentAI CRM",
        "brand_name": "SentimentAI CRM",
        "website_name": "SentimentAI CRM",
    }
    for field, value in fields.items():
        frappe.db.sql(
            "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('Website Settings', %s, %s)"
            " ON DUPLICATE KEY UPDATE `value`=%s",
            (field, value, value),
        )
    print("Brand name set to SentimentAI CRM in Website Settings.")


def _mark_setup_complete():
    """Mark the Frappe setup wizard as complete so users aren't redirected to it."""
    frappe.db.sql(
        "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('System Settings', 'setup_complete', '1')"
        " ON DUPLICATE KEY UPDATE `value`='1'",
    )
    print("Setup wizard marked as complete.")


def _enable_signup():
    """Enable user signup in System Settings."""
    frappe.db.sql(
        "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('System Settings', 'disable_signup', '0')"
        " ON DUPLICATE KEY UPDATE `value`='0'",
    )
    print("User signup enabled (disable_signup set to 0).")


def _grant_admin_crm_roles():
    """Give Administrator the Sales Manager role so they land on /crm after login."""
    try:
        admin = frappe.get_doc("User", "Administrator")
        existing_roles = [r.role for r in admin.roles]
        added = []
        for role in ("Sales Manager", "Sales User"):
            if role not in existing_roles:
                admin.append("roles", {"role": role})
                added.append(role)
        if added:
            admin.save(ignore_permissions=True)
            print(f"Admin roles added: {added}")
        else:
            print("Admin already has CRM roles.")
    except Exception as e:
        print(f"Error granting admin roles: {e}")


def _patch_www_files():
    """Copy crm www overrides into frappe's www directory so they take precedence."""
    import re as _re
    bench_path = "/home/frappe/frappe-bench"
    for fname in ["login.html", "logout.html"]:
        src = os.path.join(bench_path, "apps", "crm", "crm", "www", fname)
        dst = os.path.join(bench_path, "apps", "frappe", "frappe", "www", fname)
        if os.path.exists(src):
            try:
                result = subprocess.run(["cp", "-f", src, dst], capture_output=True, text=True)
                if result.returncode == 0:
                    with open(dst) as f:
                        snippet = f.read(120)
                    print(f"{fname} patched OK. dst starts: {snippet[:80]!r}")
                else:
                    print(f"{fname} cp failed: {result.stderr[:100]}")
            except Exception as e:
                print(f"{fname} patch error: {e}")
        else:
            print(f"src not found: {src}")

    # Belt-and-suspenders: also directly patch frappe's login.html text
    frappe_login = os.path.join(bench_path, "apps", "frappe", "frappe", "www", "login.html")
    if os.path.exists(frappe_login):
        try:
            with open(frappe_login) as f:
                content = f.read()
            if "SentimentAI CRM" not in content:
                content = _re.sub(
                    r'_\(["\']Login to \{0\}["\'].*?\.format\(.*?\)',
                    '"Login to SentimentAI CRM"',
                    content,
                )
                content = _re.sub(
                    r'_\(["\']Create a \{0\} Account["\'].*?\.format\(.*?\)',
                    '"Create a SentimentAI CRM Account"',
                    content,
                )
                content = content.replace("Login to Frappe", "Login to SentimentAI CRM")
                content = content.replace("Create a Frappe Account", "Create a SentimentAI CRM Account")
                with open(frappe_login, "w") as f:
                    f.write(content)
                print("frappe/www/login.html text patched directly OK")
            else:
                print("frappe/www/login.html already has SentimentAI CRM branding")
        except Exception as e:
            print(f"frappe/www/login.html direct patch error: {e}")

    # Patch login.py to hardcode app_name
    login_py = os.path.join(bench_path, "apps", "frappe", "frappe", "www", "login.py")
    if os.path.exists(login_py):
        try:
            with open(login_py) as f:
                py_content = f.read()
            if "SentimentAI CRM" not in py_content:
                patched = _re.sub(
                    r'(context\.app_name\s*=\s*[^\n]+)',
                    'context.app_name = "SentimentAI CRM"',
                    py_content,
                )
                if patched == py_content:
                    # Pattern not found — append an override
                    patched = py_content + '\n\n# SentimentAI branding override\n_orig_gc = get_context\ndef get_context(context):\n    _orig_gc(context)\n    context.app_name = "SentimentAI CRM"\n'
                with open(login_py, "w") as f:
                    f.write(patched)
                print("login.py app_name hardcoded to SentimentAI CRM")
            else:
                print("login.py already patched")
        except Exception as e:
            print(f"login.py patch error: {e}")


def _direct_mysql_clear_head_html():
    """Bypass Frappe caching and clear head_html via a direct mysql subprocess call."""
    site_name = frappe.local.site
    bench_path = os.path.dirname(os.path.dirname(frappe.__file__))
    site_cfg_path = os.path.join(bench_path, "sites", site_name, "site_config.json")
    if not os.path.exists(site_cfg_path):
        print(f"site_config.json not found at {site_cfg_path}, skipping direct MySQL cleanup")
        return
    try:
        with open(site_cfg_path) as f:
            cfg = json.load(f)
        db_host = cfg.get("db_host", "127.0.0.1")
        db_name = cfg.get("db_name", "")
        db_user = cfg.get("db_user", db_name)
        db_pass = cfg.get("db_password", "")
        if not db_name or not db_pass:
            print("Missing db_name/db_password in site_config.json, skipping direct MySQL cleanup")
            return
        sql = "INSERT INTO tabSingles (doctype, field, value) VALUES ('Website Settings', 'head_html', '') ON DUPLICATE KEY UPDATE value=''"
        result = subprocess.run(
            ["mysql", "-h", db_host, f"-u{db_user}", f"-p{db_pass}", db_name, "-e", sql],
            capture_output=True, text=True, timeout=15
        )
        if result.returncode == 0:
            print("head_html cleared via direct MySQL subprocess OK")
        else:
            print(f"Direct MySQL subprocess failed: {result.stderr[:200]}")
    except Exception as e:
        print(f"Direct MySQL cleanup error: {e}")

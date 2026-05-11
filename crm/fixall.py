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
    frappe.db.commit()
    frappe.clear_cache()
    _direct_mysql_clear_head_html()
    print("DONE: MS Social Login Keys deleted, head_html cleaned, brand set, caches cleared.")


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


def _clear_head_html():
    # Use UPSERT so this works whether or not the row already exists
    frappe.db.sql(
        "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('Website Settings', 'head_html', '')"
        " ON DUPLICATE KEY UPDATE `value`=''",
    )
    print("head_html cleared via Frappe DB (upsert to empty).")


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

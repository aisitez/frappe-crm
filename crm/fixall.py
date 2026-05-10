"""One-time fix: remove all Microsoft OAuth from Website Settings and Social Login Keys.

Run once inside the container:
  bench --site crm.localhost execute crm.fixall.execute
"""
import frappe


def execute():
    _delete_ms_social_login_keys()
    _clear_head_html()
    frappe.db.commit()
    frappe.clear_cache()
    print("DONE: MS Social Login Keys deleted, head_html cleaned, caches cleared.")


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
    redirect_script = (
        "<!-- crm_signup_redirect -->\n"
        "<script>"
        "if(location.pathname==='/login'&&location.hash==='#signup')"
        "{location.replace('/signup');}"
        "</script>"
    )
    # Use UPSERT so this works whether or not the row already exists
    frappe.db.sql(
        "INSERT INTO `tabSingles` (`doctype`, `field`, `value`) VALUES ('Website Settings', 'head_html', %s)"
        " ON DUPLICATE KEY UPDATE `value`=%s",
        (redirect_script, redirect_script),
    )
    print("head_html set to clean redirect script (upsert).")

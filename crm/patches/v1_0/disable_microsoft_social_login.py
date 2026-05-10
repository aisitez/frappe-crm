import frappe


def execute():
    """Remove Microsoft Social Login Key so the button never appears on the login page."""
    for name in ("microsoft", "Microsoft", "office_365", "Office 365"):
        if frappe.db.exists("Social Login Key", name):
            frappe.delete_doc("Social Login Key", name, ignore_permissions=True, force=True)

    frappe.db.commit()

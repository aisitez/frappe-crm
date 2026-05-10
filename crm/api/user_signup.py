import frappe
from frappe.utils.password import update_password

_CRM_ROLES = {"System Manager", "Sales User", "Sales Manager"}
_SKIP_USERS = {"Administrator", "Guest"}


def grant_crm_access(doc, method=None):
    """Ensure every new user gets Sales User role and System User type.

    Runs on User.before_insert so the correct values are persisted on the
    first save — no second save needed and no recursion risk.
    Skips system accounts and users who already have a CRM role.
    """
    if doc.email in _SKIP_USERS:
        return

    existing_roles = {r.role for r in doc.get("roles", [])}
    if not existing_roles & _CRM_ROLES:
        doc.append("roles", {"role": "Sales User"})

    if doc.user_type != "System User":
        doc.user_type = "System User"


@frappe.whitelist(allow_guest=True)
def create_account(full_name: str, email: str, password: str) -> dict:
    """Create a new CRM user with a password and log them in immediately."""
    email = email.strip().lower()
    full_name = full_name.strip()

    if not full_name or not email or not password:
        frappe.throw("Name, email, and password are required.", frappe.ValidationError)

    if len(password) < 6:
        frappe.throw("Password must be at least 6 characters.", frappe.ValidationError)

    if frappe.db.exists("User", email):
        frappe.throw("An account with this email already exists.", frappe.DuplicateEntryError)

    parts = full_name.split(" ", 1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "enabled": 1,
        "user_type": "System User",
        "send_welcome_email": 0,
    })
    user.append("roles", {"role": "Sales User"})
    user.insert(ignore_permissions=True)
    frappe.db.commit()

    update_password(email, password)
    frappe.db.commit()

    frappe.local.login_manager.login_as(email)
    frappe.db.commit()

    return {"status": "success", "email": email}

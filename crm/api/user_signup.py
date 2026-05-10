import frappe

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

import frappe


@frappe.whitelist(allow_guest=True)
def oauth_providers():
    """Social / OAuth login is disabled for this deployment."""
    return []

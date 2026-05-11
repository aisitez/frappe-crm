import frappe


@frappe.whitelist(allow_guest=True)
def oauth_providers():
    """Social / OAuth login is disabled for this deployment."""
    return []


@frappe.whitelist(allow_guest=True)
def head_html_debug():
    """Return first 100 chars of head_html to verify DB state."""
    result = frappe.db.sql(
        "SELECT value FROM tabSingles WHERE doctype='Website Settings' AND field='head_html'",
        as_dict=False,
    )
    value = (result[0][0] if result else "") or ""
    return {"len": len(value), "prefix": value[:120], "has_ms": "addToSignup" in value}

import frappe

no_cache = 1


def get_context(context):
    """Microsoft OAuth callback is disabled — redirect to signup."""
    frappe.local.flags.redirect_location = ""
    raise frappe.Redirect

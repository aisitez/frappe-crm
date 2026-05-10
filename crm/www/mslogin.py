import frappe

no_cache = 1


def get_context(context):
    # Microsoft login is disabled — redirect everyone to the custom signup/login page.
    frappe.local.flags.redirect_location = "/signup"
    raise frappe.Redirect

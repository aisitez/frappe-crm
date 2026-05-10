import frappe

no_cache = 1
allow_guest = True


def get_context(context):
    if frappe.session.user != "Guest":
        frappe.local.flags.redirect_location = "/crm/leads/view/list"
        raise frappe.Redirect
    context.no_header = True
    context.no_footer = True

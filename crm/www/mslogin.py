import frappe

no_cache = 1


def get_context(context):
    # Allow guests — this page initiates the Microsoft login flow before any session exists
    context.no_breadcrumbs = 1
    context.no_header = 1
    context.no_footer = 1

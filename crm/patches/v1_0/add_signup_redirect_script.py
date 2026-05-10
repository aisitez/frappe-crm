import frappe


def execute():
    """Inject a redirect script into Website Settings head_html so that
    /login#signup always goes to our custom /signup page."""
    marker = "<!-- crm_signup_redirect -->"
    script = (
        marker + "\n"
        "<script>"
        "if(location.pathname==='/login'&&location.hash==='#signup')"
        "{location.replace('/signup');}"
        "</script>"
    )

    settings = frappe.get_single("Website Settings")
    head_html = settings.head_html or ""

    if marker not in head_html:
        settings.head_html = head_html + "\n" + script
        settings.save(ignore_permissions=True)
        frappe.db.commit()

import frappe


def execute():
    """Remove the old Microsoft button injection script from Website Settings
    head_html and replace it with only a harmless #signup→/signup redirect."""
    redirect_script = (
        "<!-- crm_signup_redirect -->\n"
        "<script>"
        "if(location.pathname==='/login'&&location.hash==='#signup')"
        "{location.replace('/signup');}"
        "</script>"
    )

    settings = frappe.get_single("Website Settings")
    # Wipe any old head_html content — it contained MS OAuth injection code
    settings.head_html = redirect_script
    settings.save(ignore_permissions=True)
    frappe.db.commit()

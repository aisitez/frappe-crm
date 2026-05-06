import frappe

no_cache = 1


def get_context(context):
	code = frappe.form_dict.get("code")
	state = frappe.form_dict.get("state")
	error = frappe.form_dict.get("error")

	if error:
		frappe.local.flags.redirect_location = "/login?redirect-to=/crm"
		raise frappe.Redirect

	if code and state:
		frappe.local.flags.redirect_location = (
			f"/api/method/frappe.integrations.oauth2_logins.login_via_oauth2_code"
			f"?code={code}&state={state}"
		)
		raise frappe.Redirect

	frappe.local.flags.redirect_location = "/login?redirect-to=/crm"
	raise frappe.Redirect

import frappe
import json
import base64


def _decode_and_login(id_token):
	"""Decode MSAL JWT, create user if needed, and establish Frappe session."""
	if not id_token:
		frappe.throw("Token required", frappe.AuthenticationError)

	parts = id_token.split(".")
	if len(parts) < 2:
		frappe.throw("Invalid token format")

	padding = 4 - len(parts[1]) % 4
	padded = parts[1] + ("=" * (padding % 4))
	claims = json.loads(base64.urlsafe_b64decode(padded))

	email = (
		claims.get("email")
		or claims.get("preferred_username")
		or claims.get("upn")
		or claims.get("unique_name")
	)

	if not email:
		frappe.throw("Email not found in token")

	full_name = claims.get("name", "")
	first_name = full_name.split(" ")[0] if full_name else email.split("@")[0]
	last_name = " ".join(full_name.split(" ")[1:]) if full_name and " " in full_name else ""

	_REQUIRED_ROLES = {"System Manager", "Sales User", "Sales Manager"}

	if not frappe.db.exists("User", email):
		user = frappe.get_doc({
			"doctype": "User",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"enabled": 1,
			"user_type": "System User",
			"send_welcome_email": 0,
		})
		user.append("roles", {"role": "Sales User"})
		user.insert(ignore_permissions=True)
		frappe.db.commit()
	else:
		user = frappe.get_doc("User", email)
		# Ensure user is enabled as System User with at least one CRM role
		needs_save = False
		if user.user_type != "System User":
			user.user_type = "System User"
			needs_save = True
		if not user.enabled:
			user.enabled = 1
			needs_save = True
		existing_roles = {r.role for r in user.get("roles", [])}
		if not existing_roles & _REQUIRED_ROLES:
			user.append("roles", {"role": "Sales User"})
			needs_save = True
		if needs_save:
			user.save(ignore_permissions=True)
			frappe.db.commit()

	frappe.local.login_manager.login_as(email)
	frappe.db.commit()
	return email


@frappe.whitelist(allow_guest=True)
def login_with_token(**kwargs):
	"""POST API for same-origin calls (kept for compatibility)."""
	id_token = frappe.local.form_dict.get("id_token")
	try:
		email = _decode_and_login(id_token)
		return {"status": "success", "email": email}
	except frappe.AuthenticationError:
		raise
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "MS Token Login Error")
		frappe.throw(f"Authentication failed: {str(e)}", frappe.AuthenticationError)


@frappe.whitelist(allow_guest=True)
def login_with_token_redirect(**kwargs):
	"""
	GET endpoint used by the landing page SPA.
	Validates the MSAL id_token, creates a first-party session (cookie set
	correctly because this is a same-origin navigation), then redirects to
	the CRM dashboard — bypassing all cross-origin cookie restrictions.
	"""
	id_token = frappe.local.form_dict.get("id_token")
	try:
		_decode_and_login(id_token)
		redirect_to = "/crm/leads/view/list"
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "MS Token Login Redirect Error")
		redirect_to = "/login?redirect-to=/crm&ms_error=1"

	frappe.local.response["type"] = "redirect"
	frappe.local.response["location"] = redirect_to

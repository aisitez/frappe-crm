import os
import frappe


def run():
	"""Called at Container App startup to configure integrations from env vars."""
	_configure_microsoft_sso()


def _configure_microsoft_sso():
	client_secret = os.environ.get("MICROSOFT_CLIENT_SECRET", "")
	if not client_secret:
		return

	client_id = "209d2f9b-1565-4d73-afe1-dc85545a94a3"
	tenant_id = "7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f"
	redirect_url = "https://frappecrm-app.orangesmoke-bde752a0.eastus.azurecontainerapps.io/api/method/frappe.integrations.oauth2_logins.custom/Microsoft"

	if frappe.db.exists("Social Login Key", "Microsoft"):
		frappe.db.set_value("Social Login Key", "Microsoft", "client_secret", client_secret)
		frappe.db.set_value("Social Login Key", "Microsoft", "enable_social_login", 1)
		frappe.db.commit()
		return

	doc = frappe.get_doc({
		"doctype": "Social Login Key",
		"name": "Microsoft",
		"social_login_provider": "Custom",
		"provider_name": "Microsoft",
		"enable_social_login": 1,
		"sign_ups": "Allow",
		"client_id": client_id,
		"client_secret": client_secret,
		"base_url": "https://login.microsoftonline.com/",
		"authorize_url": f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/authorize",
		"access_token_url": f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token",
		"redirect_url": redirect_url,
		"api_endpoint": "https://graph.microsoft.com/oidc/userinfo",
		"api_endpoint_args": '{"scope": "openid profile email"}',
		"auth_url_data": '{"scope": "openid profile email", "response_type": "code"}',
	})
	doc.insert(ignore_permissions=True)
	frappe.db.commit()
	print("Microsoft SSO configured")

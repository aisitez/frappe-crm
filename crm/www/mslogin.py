import urllib.parse
import frappe

no_cache = 1

_TENANT_ID = "7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f"
_CLIENT_ID = "209d2f9b-1565-4d73-afe1-dc85545a94a3"


def get_context(context):
	redirect_uri = frappe.utils.get_url("/api/method/crm.api.ms_auth.oauth_callback")
	params = urllib.parse.urlencode({
		"client_id": _CLIENT_ID,
		"response_type": "code",
		"redirect_uri": redirect_uri,
		"scope": "openid profile email",
		"response_mode": "query",
		"prompt": "select_account",
	})
	url = f"https://login.microsoftonline.com/{_TENANT_ID}/oauth2/v2.0/authorize?{params}"
	frappe.local.flags.redirect_location = url
	raise frappe.Redirect

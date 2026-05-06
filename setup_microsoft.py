import frappe
import os

os.chdir("/home/frappe/frappe-bench")
os.makedirs("/home/frappe/logs", exist_ok=True)

frappe.init(site="crm.localhost", sites_path="/home/frappe/frappe-bench/sites")
frappe.connect()
frappe.set_user("Administrator")

# Delete existing if any
if frappe.db.exists("Social Login Key", "Microsoft"):
    frappe.delete_doc("Social Login Key", "Microsoft", force=True)

doc = frappe.get_doc({
    "doctype": "Social Login Key",
    "name": "Microsoft",
    "social_login_provider": "Custom",
    "provider_name": "Microsoft",
    "enable_social_login": 1,
    "sign_ups": "Allow",
    "client_id": "74d46c89-155a-4f00-a613-4cd6c78d0586",
    "client_secret": "PLACEHOLDER_REPLACE_WITH_REAL_SECRET",
    "base_url": "https://login.microsoftonline.com/",
    "authorize_url": "https://login.microsoftonline.com/7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f/oauth2/v2.0/authorize",
    "access_token_url": "https://login.microsoftonline.com/7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f/oauth2/v2.0/token",
    "redirect_url": "http://crm.localhost:8002/msauth",
    "api_endpoint": "https://graph.microsoft.com/oidc/userinfo",
    "api_endpoint_args": '{"scope": "openid profile email"}',
    "auth_url_data": '{"scope": "openid profile email", "response_type": "code"}'
})
doc.insert(ignore_permissions=True)
frappe.db.commit()
print("Social Login Key inserted successfully")
frappe.destroy()

import frappe
import os

# Configuration from Azure Portal screenshot
CLIENT_ID = "a611bacf-83ed-454e-bfa1-449636df4305"
TENANT_ID = "7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f"
REDIRECT_URI = "https://sentimentaicrm-app.eastus2.azurecontainer.io/api/method/frappe.integrations.oauth2_logins.custom/Microsoft"

# Initialize frappe
try:
    frappe.init(site="crm.localhost", sites_path="sites")
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
        "client_id": CLIENT_ID,
        "client_secret": "REPLACE_WITH_YOUR_CLIENT_SECRET", # User must replace this
        "base_url": "https://login.microsoftonline.com/",
        "authorize_url": f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize",
        "access_token_url": f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token",
        "redirect_url": REDIRECT_URI,
        "api_endpoint": "https://graph.microsoft.com/oidc/userinfo",
        "api_endpoint_args": '{"scope": "openid profile email"}',
        "auth_url_data": '{"scope": "openid profile email", "response_type": "code"}'
    })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    print("Social Login Key 'Microsoft' inserted successfully.")
    print(f"IMPORTANT: Please ensure Redirect URI in Azure Portal is set to: {REDIRECT_URI}")
except Exception as e:
    print(f"Error: {e}")
finally:
    frappe.destroy()

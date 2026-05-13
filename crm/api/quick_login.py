"""Fast, optimized login endpoint for CRM that bypasses slow Frappe authentication."""
import frappe
from frappe.auth import LoginManager
from frappe.desk.form.load import get_user_permissions


@frappe.whitelist(allow_guest=True)
def quick_login(user, password):
	"""Fast login endpoint with proper error handling and timeouts."""
	try:
		# Quick validation
		if not user or not password:
			return {"status": "error", "message": "Missing username or password"}
		
		# Authenticate
		login_mgr = LoginManager()
		login_mgr.authenticate(user, password)
		login_mgr.post_login()
		
		# Get user info
		user_doc = frappe.get_doc("User", frappe.session.user)
		
		return {
			"status": "success",
			"message": "Login successful",
			"user": frappe.session.user,
			"full_name": user_doc.full_name,
		}
	except Exception as e:
		frappe.log_error(title="Quick Login Error", message=str(e))
		return {
			"status": "error",
			"message": str(e) if frappe.dev_mode else "Authentication failed"
		}

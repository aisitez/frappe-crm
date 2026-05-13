"""Enable signup and fix login verification issues."""
import frappe


def execute():
    """Enable signup and ensure login configuration is correct."""
    # Enable signup
    frappe.db.set_value("System Settings", "System Settings", "disable_signup", 0)
    
    # Ensure password login is enabled
    frappe.db.set_value("System Settings", "System Settings", "disable_user_pass_login", 0)
    
    # Clear cache
    frappe.clear_cache()
    
    print("✓ Signup enabled")
    print("✓ User/password login enabled")
    print("✓ Cache cleared")

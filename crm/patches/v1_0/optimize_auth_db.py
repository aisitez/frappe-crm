"""Optimize database for fast authentication."""
import frappe


def execute():
	"""Optimize User table for faster authentication."""
	try:
		# Ensure email index exists for fast user lookups
		frappe.db.sql("""
			ALTER TABLE `tabUser` 
			ADD INDEX IF NOT EXISTS idx_email (email)
		""")
		
		# Ensure name index exists (should be primary key)
		frappe.db.sql("""
			ALTER TABLE `tabUser` 
			ADD INDEX IF NOT EXISTS idx_name (name)
		""")
		
		# Ensure enabled index for faster checks
		frappe.db.sql("""
			ALTER TABLE `tabUser` 
			ADD INDEX IF NOT EXISTS idx_enabled (enabled)
		""")
		
		frappe.db.commit()
		print("✓ User table indices optimized for fast authentication")
		
		# Verify indices
		indices = frappe.db.sql("""
			SHOW INDEX FROM `tabUser`
		""", as_dict=True)
		
		print(f"✓ Active indices on User table: {len(indices)}")
		for idx in indices:
			print(f"  - {idx.get('Key_name')}")
			
	except Exception as e:
		print(f"Warning: Database optimization failed: {e}")
		frappe.log_error(title="DB Optimization Error", message=str(e))

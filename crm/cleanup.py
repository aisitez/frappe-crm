import frappe

_cleaned = False


def ensure_head_html_clean():
	"""Clear legacy MS OAuth injection and ensure correct branding on first gunicorn request."""
	global _cleaned
	if _cleaned:
		return
	_cleaned = True
	try:
		# Clear MS OAuth from head_html
		result = frappe.db.sql(
			"SELECT value FROM tabSingles WHERE doctype='Website Settings' AND field='head_html'",
			as_dict=False,
		)
		value = (result[0][0] if result else "") or ""
		if any(m in value for m in ("addToSignup", "ms-login-btn", "addToLogin", "ms-signup-btn")):
			# Import login JS from fixall to avoid duplicating the string
			try:
				from crm.fixall import _LOGIN_HEAD_JS as _ljs
			except Exception:
				_ljs = ""
			frappe.db.sql(
				"INSERT INTO tabSingles (doctype, field, value) VALUES ('Website Settings', 'head_html', %s)"
				" ON DUPLICATE KEY UPDATE value=%s",
				(_ljs, _ljs),
			)
		# Ensure brand name is set correctly
		for field in ("app_name", "brand_name", "website_name"):
			frappe.db.sql(
				"INSERT INTO tabSingles (doctype, field, value) VALUES ('Website Settings', %s, 'SentimentAI CRM')"
				" ON DUPLICATE KEY UPDATE value='SentimentAI CRM'",
				(field,),
			)
		frappe.db.commit()
		frappe.clear_cache()
	except Exception:
		pass

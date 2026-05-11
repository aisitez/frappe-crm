import frappe

_cleaned = False


def ensure_head_html_clean():
	"""Clear legacy MS OAuth injection from head_html on first gunicorn request."""
	global _cleaned
	if _cleaned:
		return
	_cleaned = True
	try:
		result = frappe.db.sql(
			"SELECT value FROM tabSingles WHERE doctype='Website Settings' AND field='head_html'",
			as_dict=False,
		)
		value = (result[0][0] if result else "") or ""
		if any(m in value for m in ("addToSignup", "ms-login-btn", "addToLogin", "ms-signup-btn")):
			frappe.db.sql(
				"INSERT INTO tabSingles (doctype, field, value) VALUES ('Website Settings', 'head_html', '')"
				" ON DUPLICATE KEY UPDATE value=''",
			)
			frappe.db.commit()
	except Exception:
		pass

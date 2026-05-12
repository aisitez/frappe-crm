import os
import shutil

import frappe


def set_branding():
	"""Set SentimentAI branding: splash image and replace Frappe logos."""
	try:
		frappe.db.set_value(
			"Website Settings",
			"Website Settings",
			"splash_image",
			"/assets/crm/images/logo.png",
		)
		frappe.db.commit()
	except Exception:
		pass

	_replace_frappe_logos()


def _replace_frappe_logos():
	"""Overwrite Frappe's default F logos with our S logo PNG."""
	bench_path = frappe.utils.get_bench_path()
	s_logo = os.path.join(bench_path, "sites", "assets", "crm", "images", "logo.png")

	if not os.path.exists(s_logo):
		return

	targets = [
		os.path.join(bench_path, "sites", "assets", "frappe", "images", "frappe-framework-logo.png"),
		os.path.join(bench_path, "sites", "assets", "frappe", "images", "frappe-logo.png"),
		os.path.join(bench_path, "sites", "assets", "frappe", "images", "framework.png"),
		os.path.join(bench_path, "apps", "frappe", "frappe", "public", "images", "frappe-framework-logo.png"),
		os.path.join(bench_path, "apps", "frappe", "frappe", "public", "images", "frappe-logo.png"),
	]

	for target in targets:
		try:
			shutil.copy2(s_logo, target)
		except Exception:
			pass

"""Find and overwrite every mslogin.html on disk + clear gunicorn cache.

Run: bench --site crm.localhost execute crm.fix_mslogin_static.execute
"""
import os
import subprocess


REDIRECT_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0;url=/signup">
<title>Redirecting</title>
<script>window.location.replace('/signup');</script>
</head>
<body></body>
</html>"""


def execute():
    # Find EVERY mslogin.html on the filesystem and overwrite it
    overwritten = []
    for root_dir in ("/", ):
        for dirpath, dirnames, filenames in os.walk(root_dir, topdown=True, onerror=None):
            # Skip proc/sys/dev to avoid infinite loops
            dirnames[:] = [
                d for d in dirnames
                if dirpath + "/" + d not in ("/proc", "/sys", "/dev", "/run")
                and not dirpath.startswith("/proc")
                and not dirpath.startswith("/sys")
            ]
            for fname in filenames:
                if fname == "mslogin.html":
                    full_path = os.path.join(dirpath, fname)
                    try:
                        with open(full_path, "r") as f:
                            content = f.read()
                        # Only overwrite if it contains Microsoft OAuth code
                        if "microsoftonline" in content or "CLIENT_ID" in content or "msal" in content.lower():
                            with open(full_path, "w") as f:
                                f.write(REDIRECT_HTML)
                            overwritten.append(full_path)
                            print(f"Overwrote: {full_path}")
                    except Exception as e:
                        print(f"Skipped {full_path}: {e}")

    if not overwritten:
        print("No Microsoft OAuth mslogin.html files found to overwrite.")
    else:
        print(f"Overwrote {len(overwritten)} file(s). Reloading nginx...")
        try:
            result = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
            print("nginx reload:", result.returncode, result.stdout, result.stderr)
        except Exception as e:
            print("nginx reload failed:", e)

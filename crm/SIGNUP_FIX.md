# Fix for Signup Link & Login Verification Issues

## Quick Fix (Immediate)

### Step 1: Apply Database Patch
Run this in your Docker container:

```bash
bench --site crm.localhost execute crm.patches.v1_0.enable_signup.execute
```

### Step 2: Run Full Configuration
```bash
bench --site crm.localhost execute crm.fixall.execute
```

### Step 3: Clear Browser Cache & Cookies
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "All time"
3. Check "Cookies and other site data"
4. Click "Clear data"

### Step 4: Hard Refresh
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open Developer Tools > Network > Disable Cache, then refresh

---

## What These Fixes Do

✓ **Signup Link**: Shows "Don't have an account? Sign up" link on login page  
✓ **Signup Form**: Enables the signup form when you click #signup  
✓ **Login Verification**: Ensures password login is enabled  
✓ **Branding**: Sets SentimentAI CRM branding throughout  

---

## Troubleshooting "Verifying..." Issue

If login still shows "Verifying..." loading:

### 1. Check Browser Console (F12)
- Open **Developer Tools** (F12)
- Go to **Console** tab
- Look for red error messages
- Take a screenshot and share

### 2. Check Network Tab
- Go to **Network** tab
- Try to login
- Look for failed requests (red)
- Click on failed request and check the error message

### 3. Check Common Issues
- **Clear cookies**: Ctrl+Shift+Delete
- **Try Incognito**: Ctrl+Shift+N
- **Try different browser**: Chrome, Firefox, or Edge

### 4. Backend Check
```bash
# Check if authentication API is working
curl -X POST http://localhost:8000/api/method/frappe.client.get \
  -H "Content-Type: application/json" \
  -d '{"doctype": "User", "name": "Administrator"}'
```

---

## If Still Not Working

Contact support with:
1. Browser console errors (screenshot from F12)
2. Output from running the patch commands
3. Browser type and version

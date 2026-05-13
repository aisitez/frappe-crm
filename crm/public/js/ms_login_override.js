/* Inject "Sign in with Microsoft" button on Frappe login page and apply CRM styling. */
(function () {
    'use strict';

    var TENANT_ID = '7f94f5fb-b4f9-4f9d-8d0c-dab7cdc1234f';
    var CLIENT_ID = '209d2f9b-1565-4d73-afe1-dc85545a94a3';
    var REDIRECT_URI = window.location.origin + '/api/method/crm.api.ms_auth.oauth_callback';

    var MS_LOGO = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0">' +
        '<rect x="1" y="1" width="8.5" height="8.5" fill="#f25022"/>' +
        '<rect x="10.5" y="1" width="8.5" height="8.5" fill="#7fba00"/>' +
        '<rect x="1" y="10.5" width="8.5" height="8.5" fill="#00a4ef"/>' +
        '<rect x="10.5" y="10.5" width="8.5" height="8.5" fill="#ffb900"/>' +
        '</svg>';

    function injectStyles() {
        if (document.getElementById('crm-login-styles')) return;
        var style = document.createElement('style');
        style.id = 'crm-login-styles';
        style.textContent = [
            '.login-content.page-card{border-radius:16px!important;box-shadow:0 10px 30px rgba(0,0,0,.04)!important;border:1px solid #f0f0f0!important}',
            '.page-card-head img{width:60px!important;margin-bottom:16px!important}',
            '.page-card-head h4{font-weight:700!important;color:#111!important;font-size:20px!important;margin-bottom:24px!important}',
            '.form-control{background-color:#f3f4f6!important;border:1.5px solid #e5e7eb!important;border-radius:10px!important;padding:12px 16px!important;font-size:15px!important;color:#111!important;transition:all .2s!important}',
            '.form-control:focus{background-color:#fff!important;border-color:#9ca3af!important;box-shadow:none!important}',
            '.btn-primary{background-color:#111!important;border-color:#111!important;border-radius:10px!important;padding:12px!important;font-weight:600!important;font-size:15px!important;margin-top:10px!important;transition:opacity .2s!important}',
            '.btn-primary:hover{opacity:.9!important}',
            '.sign-up-message,.forgot-password-message{font-size:14px!important;color:#666!important;margin-top:20px!important}',
            '.sign-up-message a,.forgot-password-message a{color:#111!important;font-weight:600!important;text-decoration:none!important}',
            '.sign-up-message a:hover{text-decoration:underline!important}',
            '#ms-login-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;margin-top:0;background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;font-size:15px;font-weight:600;color:#111;cursor:pointer;transition:background .15s}',
            '#ms-login-btn:hover{background:#f9fafb}',
            '#ms-login-btn:disabled{opacity:.6;cursor:not-allowed}',
            '.crm-or-divider{display:flex;align-items:center;gap:10px;margin:12px 0;color:#9ca3af;font-size:13px}',
            '.crm-or-divider::before,.crm-or-divider::after{content:"";flex:1;height:1px;background:#e5e7eb}',
        ].join('');
        document.head.appendChild(style);
    }

    function injectMicrosoftButton() {
        if (document.getElementById('ms-login-btn')) return;
        var loginActions = document.querySelector('section.for-login .page-card-actions');
        if (!loginActions) return;

        var divider = document.createElement('div');
        divider.className = 'crm-or-divider';
        divider.textContent = 'or';
        loginActions.appendChild(divider);

        var btn = document.createElement('button');
        btn.id = 'ms-login-btn';
        btn.type = 'button';
        btn.innerHTML = MS_LOGO + 'Sign in with Microsoft';
        btn.addEventListener('click', initiateLogin);
        loginActions.appendChild(btn);
    }

    function initiateLogin() {
        var btn = document.getElementById('ms-login-btn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = MS_LOGO + 'Redirecting…';
        }
        var state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        try { sessionStorage.setItem('ms_oauth_state', state); } catch (e) {}

        var params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: 'openid profile email',
            state: state,
            response_mode: 'query',
            prompt: 'select_account'
        });
        window.location.href = 'https://login.microsoftonline.com/' + TENANT_ID + '/oauth2/v2.0/authorize?' + params.toString();
    }

    function applyAll() {
        if (!document.querySelector('section.for-login')) return;
        injectStyles();
        injectMicrosoftButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll);
    } else {
        applyAll();
    }

    window.addEventListener('hashchange', function () {
        setTimeout(applyAll, 50);
    });
})();

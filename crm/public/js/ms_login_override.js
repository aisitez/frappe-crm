/* On the Frappe login page:
   - Hide all Microsoft login/signup buttons completely.
   - Revert to standard Frappe signup flow (remove redirects).
   - Inject CSS to match the "old" design (Image 2 style). */
(function () {
    'use strict';
    if (location.pathname !== '/login') return;

    function injectStyles() {
        if (document.getElementById('crm-login-styles')) return;
        var style = document.createElement('style');
        style.id = 'crm-login-styles';
        style.innerHTML = `
            /* Card design */
            .login-content.page-card {
                border-radius: 16px !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.04) !important;
                border: 1px solid #f0f0f0 !important;
            }
            .page-card-head img {
                width: 60px !important;
                margin-bottom: 16px !important;
            }
            .page-card-head h4 {
                font-weight: 700 !important;
                color: #111 !important;
                font-size: 20px !important;
                margin-bottom: 24px !important;
            }

            /* Input design */
            .form-control {
                background-color: #f3f4f6 !important;
                border: 1.5px solid #e5e7eb !important;
                border-radius: 10px !important;
                padding: 12px 16px !important;
                font-size: 15px !important;
                color: #111 !important;
                transition: all 0.2s !important;
            }
            .form-control:focus {
                background-color: #fff !important;
                border-color: #9ca3af !important;
                box-shadow: none !important;
            }

            /* Button design */
            .btn-primary {
                background-color: #111 !important;
                border-color: #111 !important;
                border-radius: 10px !important;
                padding: 12px !important;
                font-weight: 600 !important;
                font-size: 15px !important;
                margin-top: 10px !important;
                transition: opacity 0.2s !important;
            }
            .btn-primary:hover {
                opacity: 0.9 !important;
            }

            /* Link design */
            .sign-up-message, .forgot-password-message {
                font-size: 14px !important;
                color: #666 !important;
                margin-top: 20px !important;
            }
            .sign-up-message a, .forgot-password-message a {
                color: #111 !important;
                font-weight: 600 !important;
                text-decoration: none !important;
            }
            .sign-up-message a:hover {
                text-decoration: underline !important;
            }
        `;
        document.head.appendChild(style);
    }

    function hideMicrosoftButtons() {
        document.querySelectorAll('a, button').forEach(function (el) {
            var cls  = el.className || '';
            var text = (el.textContent || '').toLowerCase();
            if (
                cls.indexOf('microsoft') !== -1 ||
                text.indexOf('microsoft') !== -1 ||
                (el.href && el.href.indexOf('microsoft') !== -1) ||
                (el.href && el.href.indexOf('mslogin') !== -1)
            ) {
                el.style.display = 'none';
                var parent = el.parentElement;
                if (parent && parent.tagName === 'LI') {
                    parent.style.display = 'none';
                }
                if (parent && (parent.classList.contains('login-button-wrapper') || parent.classList.contains('social-login-buttons'))) {
                    parent.style.display = 'none';
                }
            }
        });
    }

    function applyAll() {
        injectStyles();
        hideMicrosoftButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll);
    } else {
        applyAll();
    }

    // Re-apply when switching tabs or dynamic changes
    window.addEventListener('hashchange', function () {
        setTimeout(applyAll, 50);
    });

    var observer = new MutationObserver(function () { applyAll(); });
    observer.observe(document.body, { childList: true, subtree: true });
})();

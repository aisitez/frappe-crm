/* On the Frappe login page:
   - Redirect "Sign up" / #signup links to our custom /signup page (not Microsoft).
   - Redirect Microsoft login buttons to our MSAL page (/mslogin). */
(function () {
    'use strict';
    if (location.pathname !== '/login') return;

    function patchMicrosoftButtons() {
        document.querySelectorAll('a').forEach(function (a) {
            var cls  = a.className || '';
            var text = (a.textContent || '').toLowerCase();
            if (
                cls.indexOf('Microsoft') !== -1 ||
                cls.indexOf('microsoft') !== -1 ||
                text.indexOf('microsoft') !== -1
            ) {
                a.href = '/mslogin';
                a.removeAttribute('onclick');
            }
        });
    }

    // Redirect the "Don't have an account? Sign up" link to our custom signup page
    function patchSignupLink() {
        document.querySelectorAll('a[href="#signup"]').forEach(function (a) {
            a.href = '/signup';
        });
    }

    // If someone lands directly on /login#signup, send them to our custom signup page
    function redirectSignupHash() {
        if (location.hash === '#signup') {
            location.replace('/signup');
        }
    }

    function applyAll() {
        patchMicrosoftButtons();
        patchSignupLink();
    }

    redirectSignupHash();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll);
    } else {
        applyAll();
    }

    // Re-patch when switching between #login / #signup / #forgot tabs
    window.addEventListener('hashchange', function () {
        redirectSignupHash();
        setTimeout(applyAll, 50);
    });
})();

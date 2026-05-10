/* Redirect all Microsoft sign-in/sign-up buttons to our MSAL page (/mslogin).
   Frappe renders these buttons via Social Login Key — their auth_url points to
   Frappe's OAuth2 flow, but we use a custom MSAL implicit-flow page instead. */
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', patchMicrosoftButtons);
    } else {
        patchMicrosoftButtons();
    }

    // Re-patch when switching between #login / #signup / #forgot tabs
    window.addEventListener('hashchange', function () {
        setTimeout(patchMicrosoftButtons, 50);
    });
})();

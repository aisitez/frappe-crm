/* On the Frappe login page:
   - Hide all Microsoft login/signup buttons completely.
   - Redirect "Sign up" / #signup links to our custom /signup page. */
(function () {
    'use strict';
    if (location.pathname !== '/login') return;

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
            }
        });
    }

    // Redirect the "Don't have an account? Sign up" link to our custom signup page
    function patchSignupLink() {
        document.querySelectorAll('a[href="#signup"]').forEach(function (a) {
            a.href = '/signup';
        });
    }

    // If someone lands on /login#signup, send them to our custom signup page
    function redirectSignupHash() {
        if (location.hash === '#signup') {
            location.replace('/signup');
        }
    }

    function applyAll() {
        hideMicrosoftButtons();
        patchSignupLink();
    }

    redirectSignupHash();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll);
    } else {
        applyAll();
    }

    // Re-apply when switching tabs
    window.addEventListener('hashchange', function () {
        redirectSignupHash();
        setTimeout(applyAll, 50);
    });

    // Watch for dynamically rendered buttons (Frappe renders login page via JS)
    var observer = new MutationObserver(function () { applyAll(); });
    observer.observe(document.body, { childList: true, subtree: true });
})();

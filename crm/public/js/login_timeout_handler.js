/**
 * Enhanced login handler with timeout protection and better error handling
 * Fixes the "Verifying..." infinite loading issue
 */
(function() {
    'use strict';
    if (location.pathname !== '/login') return;
    
    var LOGIN_TIMEOUT = 15000; // 15 seconds
    var loginAttempt = null;
    
    function setupLoginTimeout() {
        var loginForm = document.querySelector('form.form-signin');
        if (!loginForm) return;
        
        loginForm.addEventListener('submit', function(e) {
            // Clear any previous timeout
            if (loginAttempt) clearTimeout(loginAttempt.timer);
            
            var submitBtn = loginForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            var originalText = submitBtn.textContent;
            var originalDisabled = submitBtn.disabled;
            
            loginAttempt = {
                startTime: Date.now(),
                timer: setTimeout(function() {
                    console.error('[CRM Login] Timeout after ' + LOGIN_TIMEOUT + 'ms');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = originalDisabled;
                    
                    var errorDiv = document.querySelector('.login-error-message');
                    if (!errorDiv) {
                        errorDiv = document.createElement('div');
                        errorDiv.className = 'login-error-message';
                        errorDiv.style.cssText = 'color:red;padding:10px;margin:10px 0;text-align:center;border-radius:5px;background:#ffe6e6;';
                        loginForm.parentElement.insertBefore(errorDiv, loginForm);
                    }
                    errorDiv.textContent = 'Login timeout. Please check your internet connection and try again.';
                    errorDiv.style.display = 'block';
                    
                    // Log to console for debugging
                    console.log('[CRM Login] Form state:', {
                        email: loginForm.querySelector('input[type="text"]')?.value,
                        timestamp: new Date().toISOString(),
                        duration: Date.now() - loginAttempt.startTime
                    });
                }, LOGIN_TIMEOUT)
            };
        }, true);
        
        // Clear timeout on successful submission
        window.addEventListener('beforeunload', function() {
            if (loginAttempt && loginAttempt.timer) {
                clearTimeout(loginAttempt.timer);
            }
        });
    }
    
    function addNetworkStatusIndicator() {
        if (!navigator.onLine) {
            var offlineMsg = document.createElement('div');
            offlineMsg.style.cssText = 'background:#fff3cd;color:#856404;padding:12px;margin:0 0 20px 0;border-radius:5px;text-align:center;';
            offlineMsg.textContent = '⚠ You appear to be offline. Please check your internet connection.';
            var form = document.querySelector('.form-signin');
            if (form && form.parentElement) {
                form.parentElement.insertBefore(offlineMsg, form);
            }
        }
        
        window.addEventListener('online', function() {
            console.log('[CRM Login] Network restored');
        });
        
        window.addEventListener('offline', function() {
            console.error('[CRM Login] Network lost');
            alert('Your internet connection was lost. Please reconnect and try again.');
        });
    }
    
    function init() {
        setupLoginTimeout();
        addNetworkStatusIndicator();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { loginRequest } from './authConfig';
import './styles/App.css';

const CRM_URL = '';

const MainContent = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [status, setStatus] = useState('Redirecting to Microsoft login...');

    // Auto-redirect to Azure CIAM if not authenticated
    useEffect(() => {
        if (!activeAccount) {
            instance.loginRedirect({
                ...loginRequest,
                scopes: ['openid', 'profile', 'email'],
                prompt: 'login',
            }).catch(console.error);
        }
    }, []);

    // After MSAL auth: create Frappe session and redirect to CRM dashboard
    useEffect(() => {
        if (activeAccount) {
            setStatus('Signing you in to CRM...');
            loginToFrappe();
        }
    }, [activeAccount]);

    const loginToFrappe = async () => {
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: ['openid', 'profile', 'email'],
                account: activeAccount,
            });
            // Use redirect endpoint: server sets session cookie then redirects to /crm
            window.location.replace(
                `${CRM_URL}/api/method/crm.api.ms_auth.login_with_token_redirect?id_token=` +
                encodeURIComponent(tokenResponse.idToken)
            );
        } catch (e) {
            console.error('Frappe login error:', e);
            window.location.href = `${CRM_URL}/login`;
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            color: '#333'
        }}>
            <AuthenticatedTemplate>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40, height: 40, border: '4px solid #0078d4',
                        borderTop: '4px solid transparent', borderRadius: '50%',
                        animation: 'spin 1s linear infinite', margin: '0 auto 16px'
                    }} />
                    <p>{status}</p>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40, height: 40, border: '4px solid #0078d4',
                        borderTop: '4px solid transparent', borderRadius: '50%',
                        animation: 'spin 1s linear infinite', margin: '0 auto 16px'
                    }} />
                    <p>Redirecting to Microsoft login...</p>
                </div>
            </UnauthenticatedTemplate>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <MainContent />
        </MsalProvider>
    );
};

export default App;

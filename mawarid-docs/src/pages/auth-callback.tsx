import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';

const TOKEN_KEY = 'github_token';

function AuthCallbackInner() {
    const { siteConfig } = useDocusaurusContext();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMsg, setErrorMsg] = useState('');

    const proxyUrl =
        (siteConfig.customFields?.oauthProxyUrl as string) || 'http://localhost:3001' || 'https://mawarid-document.onrender.com';
    const baseUrl = siteConfig.baseUrl || '/';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
            setErrorMsg(`GitHub OAuth error: ${error}`);
            setStatus('error');
            return;
        }

        if (!code) {
            setErrorMsg('No authorization code received from GitHub.');
            setStatus('error');
            return;
        }

        // Exchange code for access token via proxy
        fetch(`${proxyUrl}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                console.log('GitHub Auth Callback response data:', data);

                if (data.access_token) {
                    localStorage.setItem('github_token', data.access_token);
                    console.log('GitHub data:', data);
                    // 1. Restore username
                    let finalUsername = data.username;
                    if (!finalUsername || finalUsername === 'undefined') {
                        try {
                            const uRes = await fetch('https://api.github.com/user', {
                                headers: { Authorization: `Bearer ${data.access_token}` },
                            });
                            if (uRes.ok) {
                                const uData = await uRes.json();
                                finalUsername = uData.login;
                            }
                        } catch (e) { console.error('Manual username fetch failed:', e); }
                    }
                    localStorage.setItem('github_username', finalUsername || '');

                    // 2. Restore repo
                    let finalRepo = data.repo_name;
                    if (!finalRepo || finalRepo === 'undefined') {
                        finalRepo = siteConfig.projectName as string;
                    }
                    localStorage.setItem('github_repo', finalRepo || '');

                    setStatus('success');

                    const redirect = sessionStorage.getItem('auth_redirect') || `${baseUrl}docs/intro`;
                    sessionStorage.removeItem('auth_redirect');
                    setTimeout(() => {
                        window.location.href = redirect;
                    }, 800);
                } else {
                    setErrorMsg(data.error_description || data.error || 'Failed to get access token.');
                    setStatus('error');
                }
            })
            .catch((err) => {
                setErrorMsg(`Could not reach auth proxy: ${err.message}`);
                setStatus('error');
            });
    }, []);

    const containerStyle: React.CSSProperties = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        background: 'linear-gradient(135deg, #0a2d4d 0%, #1a5276 60%, #117a65 100%)',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '24px',
    };

    return (
        <div style={containerStyle}>
            <img
                src="https://portal.mawarid.com.sa/System/assets/images/mawarid-logo-2.png"
                alt="Mawarid"
                style={{ width: 110, marginBottom: 8 }}
            />
            {status === 'loading' && (
                <>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>Signing you in…</p>
                    <p style={{ opacity: 0.6, margin: 0, fontSize: '0.85rem' }}>
                        Exchanging token with GitHub
                    </p>
                </>
            )}
            {status === 'success' && (
                <>
                    <p style={{ fontSize: '1.1rem', margin: 0, color: '#6fcf97' }}>
                        ✅ Authenticated successfully!
                    </p>
                    <p style={{ opacity: 0.6, margin: 0, fontSize: '0.85rem' }}>
                        Redirecting to docs…
                    </p>
                </>
            )}
            {status === 'error' && (
                <>
                    <p style={{ fontSize: '1.1rem', margin: 0, color: '#eb5757' }}>
                        ❌ Authentication failed
                    </p>
                    <p style={{ opacity: 0.7, margin: 0, fontSize: '0.85rem', maxWidth: 400 }}>
                        {errorMsg}
                    </p>
                    <a
                        href={`${baseUrl}login`}
                        style={{
                            marginTop: 16,
                            padding: '10px 24px',
                            background: '#fff',
                            color: '#0a2d4d',
                            borderRadius: 8,
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Try again
                    </a>
                </>
            )}
        </div>
    );
}

export default function AuthCallbackPage(): ReactNode {
    return (
        <BrowserOnly fallback={<div />}>
            {() => <AuthCallbackInner />}
        </BrowserOnly>
    );
}

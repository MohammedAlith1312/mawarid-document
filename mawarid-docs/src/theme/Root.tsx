import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BrowserOnly from '@docusaurus/BrowserOnly';
import TextBlock from '@site/src/components/issuesFeatures/TextBlock';

const TOKEN_KEY = 'github_token';

const loadingScreen = (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            background: 'linear-gradient(135deg, #0a2d4d 0%, #1a5276 60%, #117a65 100%)',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            zIndex: 9999,
        }}
    >
        <img
            src="https://portal.mawarid.com.sa/System/assets/images/mawarid-logo-2.png"
            alt="Mawarid"
            style={{ width: 110 }}
        />
        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>Verifying access…</p>
    </div>
);

export default function Root({ children }: { children: ReactNode }) {
    // 'checking' → determining auth state
    // 'allowed'  → show the page (authenticated or public)
    // 'blocked'  → not authenticated, redirect in progress
    const [state, setState] = useState<'checking' | 'allowed' | 'blocked'>('checking');

    const loginUrl = useBaseUrl('/login', { absolute: true });
    const callbackUrl = useBaseUrl('/auth-callback', { absolute: true });

    useEffect(() => {
        // Public pages (login, auth-callback) always show immediately
        const path = window.location.href;
        if (path.includes(loginUrl) || path.includes(callbackUrl)) {
            setState('allowed');
            return;
        }

        const token = localStorage.getItem(TOKEN_KEY);

        const doRedirect = () => {
            sessionStorage.setItem('auth_redirect', window.location.pathname + window.location.search);
            // Use replace so back button doesn't loop
            window.location.replace(loginUrl);
        };

        if (!token) {
            setState('blocked');
            doRedirect();
            return;
        }

        // Verify token with GitHub — show nothing until confirmed
        fetch('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.ok) {
                    setState('allowed');
                } else {
                    // Token invalid / expired — clear and redirect
                    localStorage.removeItem(TOKEN_KEY);
                    setState('blocked');
                    doRedirect();
                }
            })
            .catch(() => {
                // Network error — if token exists, allow access rather than locking out
                setState('allowed');
            });
    }, [loginUrl, callbackUrl]);

    // While checking or blocked: show full-screen loading overlay (not the page content)
    if (state !== 'allowed') {
        return loadingScreen;
    }

    return <>{children}
        <BrowserOnly>
            {() => <TextBlock />}
        </BrowserOnly></>;
}

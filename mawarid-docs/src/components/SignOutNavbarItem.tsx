import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

const TOKEN_KEY = 'github_token';

function SignOutButtonInner() {
    const loginUrl = useBaseUrl('/login', { absolute: true });

    function handleSignOut() {
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.clear();
        window.location.replace(loginUrl);
    }

    return (
        <button
            onClick={handleSignOut}
            title="Sign out"
            style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                color: 'var(--ifm-navbar-link-color)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
            }}
        >
            {/* Sign out icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
        </button>
    );
}

export default function SignOutNavbarItem(): React.ReactNode {
    return (
        <BrowserOnly fallback={null}>
            {() => <SignOutButtonInner />}
        </BrowserOnly>
    );
}

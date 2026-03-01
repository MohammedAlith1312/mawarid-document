import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './UserProfileDropdown.module.css';

function UserProfileDropdownInner() {
    const [username, setUsername] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem('github_username');
        if (stored && stored !== 'undefined' && stored !== '') {
            setUsername(stored);
        }

        const storedName = localStorage.getItem('github_name');
        if (storedName && storedName !== 'undefined' && storedName !== '') {
            setName(storedName);
        } else if (stored) {
            // Fetch name if missing
            const token = localStorage.getItem('github_token');
            if (token) {
                fetch('https://api.github.com/user', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.name) {
                            setName(data.name);
                            localStorage.setItem('github_name', data.name);
                        }
                    })
                    .catch(e => console.error('Failed to fetch user profile:', e));
            }
        }
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleEscape(e: KeyboardEvent) {
            if (e.key === 'Escape') setIsOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);


    }, [isOpen]);

    if (!username) return null;

    const avatarUrl = `https://github.com/${username}.png?size=64`;
    const profileUrl = `https://github.com/${username}`;
    const settingsUrl = `https://github.com/settings/profile`;
    const initial = username.charAt(0).toUpperCase();

    return (
        <div
            className={styles.wrapper}
            ref={dropdownRef}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className={styles.profile}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
                aria-label="User profile menu"
                aria-expanded={isOpen}
                type="button"
            >
                {avatarError ? (
                    <span className={styles.avatarFallback}>{initial}</span>
                ) : (
                    <img
                        src={avatarUrl}
                        alt={username}
                        className={styles.avatar}
                        onError={() => setAvatarError(true)}
                    />
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-200)', marginBottom: '4px' }}>
                        {avatarError ? (
                            <span className={styles.avatarFallback} style={{ width: 40, height: 40, fontSize: '1.2rem' }}>{initial}</span>
                        ) : (
                            <img
                                src={avatarUrl}
                                alt={username}
                                className={styles.avatar}
                                style={{ width: 40, height: 40 }}
                                onError={() => setAvatarError(true)}
                            />
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {name ? (
                                <>
                                    <span style={{ fontWeight: 600, color: 'var(--ifm-color-content)', fontSize: '0.875rem', lineHeight: '1.2', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{name}</span>
                                    <span style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.8125rem', lineHeight: '1.2', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{username}</span>
                                </>
                            ) : (
                                <span style={{ fontWeight: 600, color: 'var(--ifm-color-content)', fontSize: '0.875rem', lineHeight: '1.2', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{username}</span>
                            )}
                        </div>
                    </div>

                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                        onClick={() => setIsOpen(false)}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                    </a>
                    <a
                        href={settingsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.dropdownItem}
                        onClick={() => setIsOpen(false)}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                    </a>

                    <div style={{ margin: '4px 0', height: '1px', backgroundColor: 'var(--ifm-color-emphasis-200)' }} />

                    <button
                        className={styles.dropdownItem}
                        style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--ifm-color-danger)' }}
                        onClick={() => {
                            setIsOpen(false);
                            localStorage.removeItem('github_token');
                            sessionStorage.clear();
                            window.location.replace(window.location.origin + '/mawarid-docs/login'); // fallback if baseUrl is tricky, assumes mawarid-docs is correct for now or could just use /login
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default function UserProfileDropdown(): React.ReactNode {
    return (
        <BrowserOnly fallback={null}>
            {() => <UserProfileDropdownInner />}
        </BrowserOnly>
    );
}

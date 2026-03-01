import React from 'react';
import { TextIssue } from './types';

export const SidebarIssueRow = ({ issue, onClick }: { issue: TextIssue, onClick: (issue: TextIssue) => void }) => (
    <div
        onClick={() => onClick(issue)}
        style={{
            padding: 12, border: '1px solid var(--tb-card-border)', borderRadius: 12, marginBottom: 8,
            cursor: 'pointer', transition: 'background 0.2s', background: 'var(--tb-card-bg)'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--tb-btn-secondary-hover)')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--tb-card-bg)')}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: issue.state === 'open' ? '#3b82f6' : 'var(--tb-card-text-muted)' }}>
                #{issue.issueNumber}
            </span>
            <span style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 6, fontWeight: 700,
                textTransform: 'uppercase',
                background: issue.state === 'open' ? '#dbeafe' : 'var(--tb-btn-secondary-hover)',
                color: issue.state === 'open' ? '#1d4ed8' : 'var(--tb-card-text-muted)',
            }}>
                {issue.state}
            </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tb-card-text)', marginBottom: 4 }}>{issue.title || 'No Title'}</div>
        <div style={{ fontSize: 11, color: 'var(--tb-card-text-muted)', fontStyle: 'italic', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            Ref: "{(issue.text || '').substring(0, 40)}{(issue.text || '').length > 40 ? '...' : ''}"
        </div>
    </div>
);

export const SidebarPanel = ({
    visible, refProp, title, subtitle, open, closed, onClose, onIssueClick, isSyncing, onSync
}: {
    visible: boolean;
    refProp: React.RefObject<HTMLDivElement | null>;
    title: string;
    subtitle: string;
    open: TextIssue[];
    closed: TextIssue[];
    onClose: () => void;
    onIssueClick: (issue: TextIssue) => void;
    isSyncing?: boolean;
    onSync?: () => void;
}) => (
    <div
        ref={refProp}
        style={{
            position: 'fixed',
            top: 0,
            right: visible ? 0 : -420,
            width: 400,
            height: '100vh',
            background: 'var(--tb-card-bg)',
            boxShadow: 'var(--tb-card-shadow)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            transition: 'right 0.3s cubic-bezier(.4,0,.2,1)',
            borderLeft: '1px solid var(--tb-card-border)',
        }}
    >
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--tb-card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--tb-card-text-muted)', letterSpacing: '0.1em', marginBottom: 2 }}>{subtitle}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--tb-card-text)' }}>{title}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
                {onSync && (
                    <button
                        onClick={onSync}
                        title="Sync with GitHub"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tb-card-text-muted)', padding: 6, borderRadius: 8, display: 'flex' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            style={{ animation: isSyncing ? 'tb-spin 1s linear infinite' : 'none' }}>
                            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                    </button>
                )}
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tb-card-text-muted)', padding: 6, borderRadius: 8, display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tb-card-text-muted)', marginBottom: 8, marginTop: 4 }}>
                Open Issues ({open.length})
            </div>
            {open.length === 0
                ? <div style={{ color: 'var(--tb-card-text-muted)', textAlign: 'center', fontSize: 13, padding: '16px 0' }}>No active issues.</div>
                : open.map(i => <SidebarIssueRow key={i.id} issue={i} onClick={onIssueClick} />)
            }

            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tb-card-text-muted)', marginBottom: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--tb-card-border)' }}>
                Closed Issues ({closed.length})
            </div>
            {closed.length === 0
                ? <div style={{ color: 'var(--tb-card-text-muted)', textAlign: 'center', fontSize: 13, padding: '16px 0' }}>No closed issues.</div>
                : closed.map(i => <SidebarIssueRow key={i.id} issue={i} onClick={onIssueClick} />)
            }
        </div>
    </div>
);

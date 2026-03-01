import React from 'react';

export const CreateIssue = ({
    showInput,
    showToolbar,
    inputRef,
    toolbarRef,
    toolbarPosition,
    inputPosition,
    selectedText,
    selectionType,
    description,
    status,
    setDescription,
    onCopy,
    onOpenCreationForm,
    onSubmit,
    onKeyDown
}: {
    showInput: boolean;
    showToolbar: boolean;
    inputRef: React.RefObject<HTMLDivElement | null>;
    toolbarRef: React.RefObject<HTMLDivElement | null>;
    toolbarPosition: { top: number; left: number };
    inputPosition: { top: number; left: number };
    selectedText: string;
    selectionType: 'text' | 'image';
    description: string;
    status: 'idle' | 'submitting';
    setDescription: (s: string) => void;
    onCopy: () => void;
    onOpenCreationForm: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}) => {
    return (
        <>
            {showToolbar && (
                <div
                    ref={toolbarRef}
                    style={{
                        position: 'fixed', zIndex: 12000, top: toolbarPosition.top, left: toolbarPosition.left,
                        background: 'var(--tb-card-bg)', borderRadius: 12, boxShadow: 'var(--tb-card-shadow)',
                        border: '1px solid var(--tb-card-border)', display: 'flex', alignItems: 'center', gap: 4, padding: '6px 8px'
                    }}
                >
                    <button
                        onClick={onCopy}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: 'none',
                            background: 'none', cursor: 'pointer', borderRadius: 8, fontSize: 13, fontWeight: 600,
                            color: 'var(--tb-card-text)', transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--tb-btn-secondary-hover)')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                    </button>
                    <div style={{ width: 1, height: 16, background: 'var(--tb-card-border)' }} />
                    <button
                        onClick={onOpenCreationForm}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: 'none',
                            background: 'none', cursor: 'pointer', borderRadius: 8, fontSize: 13, fontWeight: 600,
                            color: '#ef4444', transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9" />
                        </svg>
                        Issues
                    </button>
                </div>
            )}

            {showInput && (
                <div
                    ref={inputRef}
                    style={{
                        position: 'fixed', zIndex: 12000, top: inputPosition.top, left: inputPosition.left,
                        background: 'var(--tb-card-bg)', borderRadius: 20, boxShadow: 'var(--tb-card-shadow)',
                        border: '1px solid var(--tb-card-border)', padding: 4, width: 320
                    }}
                >
                    <div style={{ padding: '12px 16px 0' }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--tb-card-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            NEW {selectionType === 'image' ? 'IMAGE' : 'TEXT'} ISSUE
                        </span>
                    </div>
                    <div style={{ padding: 12 }}>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onKeyDown={onKeyDown}
                            rows={4}
                            style={{
                                width: '100%', padding: 8, fontSize: 15, color: 'var(--tb-card-text)', background: 'var(--tb-input-bg)', border: '1px solid var(--tb-card-border)',
                                borderRadius: 12, outline: 'none', resize: 'none'
                            }}
                            placeholder="Description"
                            required
                            disabled={status === 'submitting'}
                            autoFocus
                        />
                    </div>
                    <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <span style={{ fontSize: 13, color: 'var(--tb-card-text-muted)', fontWeight: 500 }}>⌘ + Enter to create</span> */}
                        <button
                            onClick={onSubmit}
                            disabled={status === 'submitting' || !description.trim()}
                            style={{
                                padding: '10px 20px', background: '#111', color: '#fff', fontSize: 14,
                                fontWeight: 600, border: 'none', borderRadius: 14, cursor: 'pointer',
                                transition: 'all 0.2s', opacity: (status === 'submitting' || !description.trim()) ? 0.3 : 1,
                                pointerEvents: (status === 'submitting' || !description.trim()) ? 'none' : 'auto'
                            }}
                        >
                            {status === 'submitting' ? 'Creating...' : 'Create Issue'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

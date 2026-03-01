import React, { useState, useEffect } from 'react';
import { TextIssue } from './types';

export const IssueHoverCard = ({
    issue,
    position,
    issueCardRef,
    onCloseCard,
    onUpdateIssue,
    onCommentOnIssue,
    onCloseIssue
}: {
    issue: TextIssue;
    position: { top: number; left: number };
    issueCardRef: React.RefObject<HTMLDivElement | null>;
    onCloseCard: () => void;
    onUpdateIssue: (number: number, title: string, body: string) => Promise<boolean>;
    onCommentOnIssue: (number: number, comment: string) => Promise<boolean>;
    onCloseIssue: (number: number) => Promise<boolean>;
}) => {
    // Internal state that stays inside the card
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(issue.title);
    const [editBody, setEditBody] = useState(issue.description);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');

    // Reset local state if issue changes
    useEffect(() => {
        setEditTitle(issue.title);
        setEditBody(issue.description);
        setIsEditing(false);
        setShowCommentInput(false);
        setCommentText('');
    }, [issue.id]);

    const handleSaveList = async () => {
        const success = await onUpdateIssue(issue.issueNumber, editTitle, editBody);
        if (success) {
            setIsEditing(false);
        }
    };

    const handlePostComment = async () => {
        const success = await onCommentOnIssue(issue.issueNumber, commentText);
        if (success) {
            setShowCommentInput(false);
            setCommentText('');
        }
    };

    const handleCloseIssueAction = async () => {
        await onCloseIssue(issue.issueNumber);
    };

    return (
        <div
            ref={issueCardRef}
            style={{
                position: 'fixed', zIndex: 12000, top: position.top, left: position.left,
                background: 'var(--tb-card-bg)', borderRadius: 24, boxShadow: 'var(--tb-card-shadow)',
                border: '1px solid var(--tb-card-border)', padding: 20, width: 380
            }}
        >
            {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        style={{ fontSize: 14, fontWeight: 600, color: 'var(--tb-card-text)', background: 'var(--tb-input-bg)', border: '1px solid var(--tb-card-border)', borderRadius: 4, padding: '4px 8px', width: '100%' }}
                        placeholder="Issue Title"
                    />
                    <textarea
                        value={editBody}
                        onChange={e => setEditBody(e.target.value)}
                        style={{ fontSize: 13, color: 'var(--tb-card-text)', background: 'var(--tb-input-bg)', border: '1px solid var(--tb-card-border)', borderRadius: 4, padding: '4px 8px', width: '100%', resize: 'none', outline: 'none' }}
                        rows={3}
                        placeholder="Description..."
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button onClick={() => setIsEditing(false)} style={{ border: 'none', background: 'none', color: 'var(--tb-card-text-muted)', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleSaveList} style={{ border: 'none', background: '#2563eb', color: '#fff', fontSize: 12, padding: '4px 12px', borderRadius: 50, cursor: 'pointer' }}>Save</button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--tb-card-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LINKED ISSUE</div>
                                <span style={{
                                    fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase',
                                    background: issue.state === 'open' ? '#dbeafe' : 'var(--tb-btn-secondary-hover)',
                                    color: issue.state === 'open' ? '#1d4ed8' : 'var(--tb-card-text-muted)',
                                }}>
                                    {issue.state}
                                </span>
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tb-card-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                #{issue.issueNumber} {issue.title}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                            {issue.state === 'open' && (
                                <>
                                    <button onClick={() => setIsEditing(true)} style={{ padding: 6, border: 'none', background: 'none', color: 'var(--tb-card-text-muted)', cursor: 'pointer', borderRadius: '50%' }} title="Edit Issue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    </button>
                                    <button onClick={() => setShowCommentInput(!showCommentInput)} style={{ padding: 6, border: 'none', background: showCommentInput ? '#dbeafe' : 'none', color: showCommentInput ? '#2563eb' : 'var(--tb-card-text-muted)', cursor: 'pointer', borderRadius: '50%' }} title="Add Comment">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: 8, padding: 12, background: 'var(--tb-input-bg)', borderRadius: 12, border: '1px solid var(--tb-card-border)', marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--tb-card-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>QUICK CONTEXT</div>
                        {issue.text.startsWith('![') ? (
                            <div style={{ fontSize: 13, color: 'var(--tb-card-text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ padding: 4, background: 'var(--tb-card-bg)', border: '1px solid var(--tb-card-border)', borderRadius: 4 }}>🖼️</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Image selection</span>
                            </div>
                        ) : (
                            <div style={{ fontSize: 13, color: 'var(--tb-card-text)', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                                "{issue.text}"
                            </div>
                        )}
                    </div>

                    {showCommentInput ? (
                        <div style={{ marginTop: 8 }}>
                            <textarea
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                style={{ width: '100%', fontSize: 13, color: 'var(--tb-card-text)', background: 'var(--tb-input-bg)', border: '1px solid var(--tb-card-border)', borderRadius: 4, padding: 8, marginBottom: 8, outline: 'none', resize: 'none' }}
                                rows={2}
                                placeholder="Write a comment..."
                                autoFocus
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <button onClick={handlePostComment} style={{ background: 'var(--tb-card-text)', color: 'var(--tb-card-bg)', fontSize: 11, padding: '4px 12px', borderRadius: 50, border: 'none', cursor: 'pointer' }}>Post</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <button
                                onClick={() => {
                                    window.open(issue.issueUrl, '_blank');
                                }}
                                style={{ flex: 1, padding: '6px 16px', border: '1px solid var(--tb-card-border)', color: 'var(--tb-card-text)', fontSize: 13, fontWeight: 500, borderRadius: 50, background: 'var(--tb-card-bg)', cursor: 'pointer' }}
                            >
                                View
                            </button>
                            {issue.state === 'open' && (
                                <button
                                    onClick={handleCloseIssueAction}
                                    style={{ flex: 1, padding: '6px 16px', background: 'var(--tb-danger-bg)', color: 'var(--ifm-breadcrumb-color-active)', fontSize: 13, fontWeight: 500, borderRadius: 50, border: 'none', cursor: 'pointer' }}
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

import { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import useBaseUrl from '@docusaurus/useBaseUrl';


import { TextIssue } from './types';
import { getPagePath, calcPopupPosition } from './utils';
import { fetchIssuesList, createIssueApi, updateIssueApi, closeIssueApi, commentIssueApi } from './api';
import { applyHighlight, reapplyHighlights, useIssueHighlighter } from './useIssueHighlighter';

// TextBlockSidebarButtons moved to swizzled TOC — see src/theme/TOC/index.tsx
import { CreateIssue } from './CreateIssue';
import { IssueHoverCard } from './IssueHoverCard';
import { SidebarPanel } from './pagesOnIssue';

const notifySidebarChange = (isOpen: boolean) => {
    window.dispatchEvent(new CustomEvent('tb-sidebar-toggle', { detail: { isOpen } }));
};

interface TextBlockProps {
    initialIssues?: TextIssue[];
}

export default function TextBlock({ initialIssues = [] }: TextBlockProps) {
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();
    const loginUrl = useBaseUrl('/login');
    const callbackUrl = useBaseUrl('/auth-callback');

    const currentPath = getPagePath(location.pathname);
    const isHomePage = currentPath === getPagePath(siteConfig.baseUrl);
    const isLoginPage = currentPath === getPagePath(loginUrl);
    const isAuthCallback = currentPath === getPagePath(callbackUrl);

    const isHiddenZone = isHomePage || isLoginPage || isAuthCallback;

    // UI state
    const [showInput, setShowInput] = useState(false);
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
    const [inputPosition, setInputPosition] = useState({ top: 0, left: 0 });

    // Issue tracking state
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
    const [issues, setIssues] = useState<TextIssue[]>(initialIssues);
    const [hoveredIssue, sethoveredIssue] = useState<TextIssue | null>(null);
    const [showIssueCard, setShowIssueCard] = useState(false);
    const [issueCardPosition, setIssueCardPosition] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [selectionType, setSelectionType] = useState<'text' | 'image'>('text');
    const [description, setDescription] = useState('');
    const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

    // Sidebars state
    const [showSidebar, setShowSidebar] = useState(false);
    const [showPageSidebar, setShowPageSidebar] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pageTitle, setPageTitle] = useState('CURRENT PAGE');

    const showToastMessage = (message: string) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const inputRef = useRef<HTMLDivElement>(null);
    const issueCardRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const pageSidebarRef = useRef<HTMLDivElement>(null);
    const selectionRangeRef = useRef<Range | null>(null);
    const lastClickedImageRef = useRef<HTMLImageElement | null>(null);

    // ─── Fetch Issues ──────────────────────────────────────────────────────────
    const fetchIssues = async () => {
        try {
            const fetched = await fetchIssuesList();
            setIssues(fetched);
            setTimeout(() => reapplyHighlights(fetched, currentPath), 500);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
        }
    };

    useEffect(() => {
        if (initialIssues.length > 0) reapplyHighlights(initialIssues, currentPath);
        fetchIssues();
    }, []);

    // ─── Highlighter Hook ──────────────────────────────────────────────────────
    useIssueHighlighter(issues, location.pathname, setPageTitle);

    // ─── Global Event Listeners for sidebars ──────────────────────────────────
    useEffect(() => {
        const handleOpenSidebar = () => {
            setShowSidebar(true);
            notifySidebarChange(true);
        };
        const handleOpenPageSidebar = () => {
            setShowPageSidebar(true);
            notifySidebarChange(true);
        };

        window.addEventListener('tb-open-sidebar', handleOpenSidebar);
        window.addEventListener('tb-open-page-sidebar', handleOpenPageSidebar);

        return () => {
            window.removeEventListener('tb-open-sidebar', handleOpenSidebar);
            window.removeEventListener('tb-open-page-sidebar', handleOpenPageSidebar);
        };
    }, []);

    // ─── Event Handlers (Selection & Clicks) ───────────────────────────────────
    useEffect(() => {
        const handleTextSelection = () => {
            setTimeout(() => {
                if (showInput || showToolbar || showIssueCard) return;

                const selection = window.getSelection();
                const text = selection?.toString().trim();

                // ── Guard: only allow selection inside main content area ──
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const ancestor = range.commonAncestorContainer;
                    const ancestorEl = ancestor.nodeType === 1
                        ? ancestor as HTMLElement
                        : ancestor.parentElement;
                    const isInArticle = !!ancestorEl?.closest('article');
                    const isInAside = !!ancestorEl?.closest('aside');
                    if (!isInArticle || isInAside) {
                        return; // Selection is outside center content — ignore it
                    }
                }

                // Check selection inside existing highlight
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    let node: Node | null = range.commonAncestorContainer;
                    while (node && node !== document.body) {
                        if (node.nodeType === 1 && (node as HTMLElement).classList.contains('issue-highlight')) {
                            const issueId = (node as HTMLElement).getAttribute('data-issue-id');
                            const issue = issues.find(i => i.id === issueId);
                            if (issue) {
                                const rect = (node as HTMLElement).getBoundingClientRect();
                                const pos = calcPopupPosition(rect, 380, 200);
                                setIssueCardPosition(pos);
                                sethoveredIssue(issue);
                                setShowIssueCard(true);
                                selection.removeAllRanges();
                                return;
                            }
                        }
                        node = node.parentNode;
                    }
                }

                if (text && text.length > 0) {
                    const range = selection?.getRangeAt(0);
                    if (range) {
                        selectionRangeRef.current = range.cloneRange();
                        const rect = range.getBoundingClientRect();
                        if (rect) {
                            const pos = calcPopupPosition(rect, 200, 50);
                            setToolbarPosition(pos);
                            setSelectedText(text);
                            setSelectionType('text');
                            setDescription('');
                            setShowToolbar(true);
                        }
                    }
                }
            }, 10);
        };

        const handleClickOnHighlight = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const highlightEl =
                target.closest?.('.issue-highlight') || target.closest?.('.issue-highlight-image') ||
                (target.classList.contains('issue-highlight') || target.classList.contains('issue-highlight-image') ? target : null);

            if (highlightEl) {
                const issueId = (highlightEl as HTMLElement).getAttribute('data-issue-id');
                const issue = issues.find(i => i.id === issueId);
                if (issue) {
                    const rect = (highlightEl as HTMLElement).getBoundingClientRect();
                    const pos = calcPopupPosition(rect, 380, 220);
                    setIssueCardPosition(pos);
                    sethoveredIssue(issue);
                    setShowIssueCard(true);
                }
                e.stopPropagation();
            }
        };

        const handleImageClick = (e: MouseEvent) => {
            if (showInput || showToolbar || showIssueCard) return;
            const target = e.target as HTMLElement;
            if (target.tagName === 'IMG' && !target.classList.contains('issue-highlight-image')) {
                e.preventDefault();
                e.stopPropagation();
                const img = target as HTMLImageElement;
                const rect = img.getBoundingClientRect();
                const pos = calcPopupPosition(rect, 200, 50);
                setToolbarPosition(pos);
                setSelectedText(`![${img.alt || 'image'}](${img.src})`);
                setSelectionType('image');
                setDescription('');
                lastClickedImageRef.current = img;
                selectionRangeRef.current = null;
                setShowToolbar(true);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (toolbarRef.current && !toolbarRef.current.contains(target)) setShowToolbar(false);
            if (inputRef.current && !inputRef.current.contains(target)) setShowInput(false);
            if (issueCardRef.current && !issueCardRef.current.contains(target)) {
                setShowIssueCard(false);
            }
            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                setShowSidebar(false);
                notifySidebarChange(false);
            }
            if (pageSidebarRef.current && !pageSidebarRef.current.contains(target)) {
                setShowPageSidebar(false);
                notifySidebarChange(false);
            }
        };

        document.addEventListener('mouseup', handleTextSelection);
        document.addEventListener('click', handleClickOnHighlight);
        document.addEventListener('click', handleImageClick);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleTextSelection);
            document.removeEventListener('click', handleClickOnHighlight);
            document.removeEventListener('click', handleImageClick);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInput, showToolbar, showIssueCard, issues]);

    // ─── Handlers ──────────────────────────────────────────────────────────────
    const openCreationForm = () => {
        setShowToolbar(false);
        const rect = selectionRangeRef.current?.getBoundingClientRect() ||
            lastClickedImageRef.current?.getBoundingClientRect();
        const pos = rect ? calcPopupPosition(rect, 320, 220) : { top: 200, left: 200 };
        setInputPosition(pos);
        setShowInput(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedText).then(() => {
            setShowToolbar(false);
            window.getSelection()?.removeAllRanges();
            showToastMessage('Copied to clipboard!');
        });
    };

    const handleCreateIssue = async (e: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!description.trim()) return;
        setStatus('submitting');
        const lines = description.trim().split('\n');
        const finalTitle = lines[0].substring(0, 100).trim() || 'New Issue';
        const finalBody = lines.length > 1 ? lines.slice(1).join('\n').trim() : lines[0];
        const shortTitle = finalTitle.length > 10 ? finalTitle.substring(0, 10) + '...' : finalTitle;

        try {
            const data = await createIssueApi({
                title: shortTitle || 'New Issue from Selection',
                body: `**Description:**\n${finalBody || description}\n\n**Selected ${selectionType === 'image' ? 'Image' : 'Text'}:**\n${selectionType === 'image' ? '' : '> '}${selectedText}\n\n${selectionType === 'image' ? `**Image Link:** ${selectedText.match(/\((.*)\)/)?.[1] || ''}\n\n` : ''}**Page URL:**\n${window.location.href}`,
            });

            showToastMessage('Issue Created Successfully');
            const newIssue: TextIssue = {
                id: `issue-${data.number || Date.now()}`,
                text: selectedText,
                issueUrl: data.url,
                issueNumber: data.number,
                title: shortTitle,
                description,
                state: 'open',
                pageUrl: window.location.href,
            };

            setIssues(prev => [...prev, newIssue]);
            applyHighlight(newIssue, selectionType, lastClickedImageRef.current, selectionRangeRef.current);

            const targetRect =
                selectionType === 'image' && lastClickedImageRef.current
                    ? lastClickedImageRef.current.getBoundingClientRect()
                    : selectionRangeRef.current?.getBoundingClientRect() || null;

            if (targetRect) {
                const pos = calcPopupPosition(targetRect, 380, 220);
                setIssueCardPosition(pos);
                sethoveredIssue(newIssue);
                setShowIssueCard(true);
            }

            setShowInput(false);
            setDescription('');
            window.getSelection()?.removeAllRanges();
            selectionRangeRef.current = null;
        } catch (error) {
            console.error('Error:', error);
            showToastMessage('Failed to create issue');
        } finally {
            setStatus('idle');
        }
    };

    const handleUpdateIssue = async (number: number, title: string, body: string) => {
        if (!hoveredIssue) return false;
        try {
            await updateIssueApi(number, title, body);
            setIssues(prev => prev.map(i => i.id === hoveredIssue.id ? { ...i, title, description: body } : i));
            sethoveredIssue(prev => prev ? { ...prev, title, description: body } : null);
            showToastMessage('Issue Updated Successfully');
            return true;
        } catch (error) {
            console.error('Update Error:', error);
            return false;
        }
    };

    const handleCommentOnIssue = async (number: number, comment: string) => {
        if (!hoveredIssue) return false;
        try {
            await commentIssueApi(number, comment);
            showToastMessage('Comment Added Successfully');
            return true;
        } catch (error) {
            console.error('Comment Error:', error);
            return false;
        }
    };

    const handleCloseIssue = async (number: number) => {
        if (!hoveredIssue) return false;
        try {
            await closeIssueApi(number);
            showToastMessage('Issue Closed Successfully');

            setIssues(prev => {
                const updated = prev.map(i => i.id === hoveredIssue.id ? { ...i, state: 'closed' as const } : i);
                setTimeout(() => reapplyHighlights(updated, currentPath), 100);
                return updated;
            });

            sethoveredIssue(null);
            setShowIssueCard(false);
            return true;
        } catch (error) {
            console.error('Close Error:', error);
            showToastMessage('Failed to close issue');
            return false;
        }
    };

    const scrollToIssue = (issue: TextIssue) => {
        setShowSidebar(false);
        setShowPageSidebar(false);
        const el = document.querySelector(`[data-issue-id="${issue.id}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const rect = el.getBoundingClientRect();
                const pos = calcPopupPosition(rect, 380, 220);
                setIssueCardPosition(pos);
                sethoveredIssue(issue);
                setShowIssueCard(true);
            }, 400);
        } else {
            setIssueCardPosition({ top: window.innerHeight / 2 - 110, left: window.innerWidth / 2 - 190 });
            sethoveredIssue(issue);
            setShowIssueCard(true);
        }
    };

    // ─── Filter Issues for Sidebars ────────────────────────────────────────────
    const pageIssues = issues.filter(i => {
        if (!i.pageUrl) return false;
        const targetPath = getPagePath(i.pageUrl);
        return targetPath === currentPath;
    });

    const openIssues = issues.filter(i => i.state === 'open');
    const closedIssues = issues.filter(i => i.state === 'closed');
    const pageOpenIssues = pageIssues.filter(i => i.state === 'open');
    const pageClosedIssues = pageIssues.filter(i => i.state === 'closed');

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <>
            <style>{`@keyframes tb-spin { to { transform: rotate(360deg); } }`}</style>

            {toast.show && (
                <div style={{
                    position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10001, background: '#111', color: '#fff', padding: '12px 24px',
                    borderRadius: '50px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8
                }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    {toast.message}
                </div>
            )}

            <CreateIssue
                showInput={showInput}
                showToolbar={showToolbar}
                inputRef={inputRef}
                toolbarRef={toolbarRef}
                toolbarPosition={toolbarPosition}
                inputPosition={inputPosition}
                selectedText={selectedText}
                selectionType={selectionType}
                description={description}
                status={status}
                setDescription={setDescription}
                onCopy={handleCopy}
                onOpenCreationForm={openCreationForm}
                onSubmit={handleCreateIssue}
                onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleCreateIssue(e); }}
            />

            {showIssueCard && hoveredIssue && (
                <IssueHoverCard
                    issue={hoveredIssue}
                    position={issueCardPosition}
                    issueCardRef={issueCardRef}
                    onCloseCard={() => setShowIssueCard(false)}
                    onUpdateIssue={handleUpdateIssue}
                    onCommentOnIssue={handleCommentOnIssue}
                    onCloseIssue={handleCloseIssue}
                />
            )}

            <SidebarPanel
                visible={showSidebar}
                refProp={sidebarRef}
                title={`Issues Dashboard (${issues.length})`}
                subtitle="ALL ENVIRONMENTS"
                open={openIssues}
                closed={closedIssues}
                onClose={() => {
                    setShowSidebar(false);
                    notifySidebarChange(false);
                }}
                onIssueClick={scrollToIssue}
            />

            <SidebarPanel
                visible={showPageSidebar}
                refProp={pageSidebarRef}
                title={`Issues on Page (${pageIssues.length})`}
                subtitle={pageTitle}
                open={pageOpenIssues}
                closed={pageClosedIssues}
                onClose={() => {
                    setShowPageSidebar(false);
                    notifySidebarChange(false);
                }}
                onIssueClick={scrollToIssue}
                isSyncing={isSyncing}
                onSync={async () => {
                    setIsSyncing(true);
                    await fetchIssues();
                    setIsSyncing(false);
                    showToastMessage('Issues synced from GitHub');
                }}
            />

            {/* Issues button is now rendered inside the TOC sidebar via src/theme/TOC/index.tsx swizzle */}
        </>
    );
}

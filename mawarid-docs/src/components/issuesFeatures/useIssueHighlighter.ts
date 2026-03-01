import { useEffect } from 'react';
import { TextIssue } from './types';
import { getPagePath } from './utils';

export const applyHighlight = (issue: TextIssue, selectionType: string, lastClickedImage: HTMLImageElement | null, selectionRange: Range | null) => {
    if (selectionType === 'image' && lastClickedImage) {
        const img = lastClickedImage;
        if (img.classList.contains('issue-highlight-image')) return;
        img.classList.add('issue-highlight-image');
        img.setAttribute('data-issue-id', issue.id);
        Object.assign(img.style, {
            outline: '4px solid #3b82f6',
            outlineOffset: '2px',
            cursor: 'pointer',
            filter: 'brightness(0.9)',
            transition: 'all 0.2s ease',
        });
        return;
    }
    const range = selectionRange;
    if (!range) return;
    const span = document.createElement('span');
    span.className = 'issue-highlight';
    span.setAttribute('data-issue-id', issue.id);
    Object.assign(span.style, {
        backgroundColor: '#a3a7b0ff',
        color: 'black',
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '2px 0',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
    });
    try {
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
    } catch (e) {
        try { range.surroundContents(span); } catch (e2) { console.error(e2); }
    }
};

export const reapplyHighlights = (issuesToHighlight: TextIssue[], currentPath: string) => {
    if (!currentPath && typeof window !== 'undefined') currentPath = getPagePath(window.location.href);

    // 1. Decide which issues SHOULD be highlighted on THIS page
    const relevantIssues = issuesToHighlight.filter(i => {
        // Only highlight open issues
        if (i.state !== 'open') return false;
        // Only highlight issues that belong to the current page
        if (i.pageUrl) {
            const issuePath = getPagePath(i.pageUrl);
            return issuePath === currentPath;
        }
        // If no pageUrl is set, don't highlight (can't determine the page)
        return false;
    });

    // 2. Cleanup: Remove any existing highlights that are NOT in the relevant list
    document.querySelectorAll('[data-issue-id]').forEach(el => {
        const id = el.getAttribute('data-issue-id');
        if (!relevantIssues.some(i => i.id === id)) {
            const htmlEl = el as HTMLElement;
            if (htmlEl.classList.contains('issue-highlight')) {
                const parent = htmlEl.parentNode;
                if (parent) {
                    while (htmlEl.firstChild) parent.insertBefore(htmlEl.firstChild, htmlEl);
                    parent.removeChild(htmlEl);
                    parent.normalize();
                }
            } else if (htmlEl.classList.contains('issue-highlight-image')) {
                htmlEl.classList.remove('issue-highlight-image');
                htmlEl.removeAttribute('data-issue-id');
                htmlEl.style.outline = '';
                htmlEl.style.filter = '';
            }
        }
    });


    relevantIssues.forEach(issue => {
        if (!issue.text) return;

        // Already highlighted?
        if (document.querySelector(`[data-issue-id="${issue.id}"]`)) return;

        if (!issue.text.startsWith('![')) {
            // Helper: collect text nodes from a container, skipping highlights & navigation
            const collectTextNodes = (container: Element): Node[] => {
                const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
                const nodes: Node[] = [];
                let n: Node | null;
                while ((n = walker.nextNode())) {
                    const parentEl = n.parentElement;
                    if (!parentEl) continue;
                    // Skip nodes inside existing highlights
                    if (parentEl.closest('.issue-highlight')) continue;
                    // Skip navigation, breadcrumbs, TOC, sidebar, and page title heading
                    if (parentEl.closest('nav')) continue;
                    if (parentEl.closest('.breadcrumbs')) continue;
                    if (parentEl.closest('.table-of-contents')) continue;
                    if (parentEl.closest('aside')) continue;
                    if (parentEl.closest('h1')) continue;
                    nodes.push(n);
                }
                return nodes;
            };

            // Helper: search for text in a list of text nodes, return Range info
            const findTextInNodes = (textNodes: Node[]): { startNode: Node; startOffset: number; endNode: Node; endOffset: number } | null => {
                let fullText = '';
                const nodeOffsets: { node: Node; start: number; end: number }[] = [];
                textNodes.forEach(tn => {
                    const val = tn.nodeValue || '';
                    nodeOffsets.push({ node: tn, start: fullText.length, end: fullText.length + val.length });
                    fullText += val;
                });

                const matchIndex = fullText.indexOf(issue.text);
                if (matchIndex === -1) return null;

                const matchEnd = matchIndex + issue.text.length;
                let startNode: Node | null = null;
                let startOffset = 0;
                let endNode: Node | null = null;
                let endOffset = 0;

                for (const entry of nodeOffsets) {
                    if (!startNode && entry.end > matchIndex) {
                        startNode = entry.node;
                        startOffset = matchIndex - entry.start;
                    }
                    if (entry.end >= matchEnd) {
                        endNode = entry.node;
                        endOffset = matchEnd - entry.start;
                        break;
                    }
                }

                if (!startNode || !endNode) return null;
                return { startNode, startOffset, endNode, endOffset };
            };

            // Tiered search: prefer .markdown content (excludes h1/breadcrumbs), then article, then main
            const containers = [
                document.querySelector('.markdown'),          // Docusaurus content div (no h1/breadcrumbs)
                document.querySelector('[class*="mdxPageWrapper"]'), // MDX pages
                document.querySelector('article'),            // includes h1 heading
                document.querySelector('main'),               // includes breadcrumbs
            ].filter(Boolean) as Element[];

            let rangeInfo: ReturnType<typeof findTextInNodes> = null;
            for (const container of containers) {
                const textNodes = collectTextNodes(container);
                rangeInfo = findTextInNodes(textNodes);
                if (rangeInfo) break; // found in this tier — use it
            }

            if (!rangeInfo) return; // text not found on this page

            try {
                const range = document.createRange();
                range.setStart(rangeInfo.startNode, rangeInfo.startOffset);
                range.setEnd(rangeInfo.endNode, rangeInfo.endOffset);

                const span = document.createElement('span');
                span.className = 'issue-highlight';
                span.setAttribute('data-issue-id', issue.id);
                Object.assign(span.style, {
                    backgroundColor: issue.state === 'closed' ? '#e5e7eb' : '#a3a7b0ff',
                    color: 'black',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    padding: '2px 0',
                    boxDecorationBreak: 'clone',
                    WebkitBoxDecorationBreak: 'clone',
                    opacity: issue.state === 'closed' ? '0.6' : '1',
                });

                // extractContents + insertNode handles cross-node ranges properly
                // (surroundContents would throw if range spans multiple nodes)
                const contents = range.extractContents();
                span.appendChild(contents);
                range.insertNode(span);
            } catch (e) {
                // Ignore errors from complex DOM structures
            }
        } else {
            const match = issue.text.match(/!\[.*\]\((.*)\)/);
            if (match) {
                const reportedSrc = match[1];
                document.querySelectorAll('img').forEach(img => {
                    const image = img as HTMLImageElement;
                    if (image.classList.contains('issue-highlight-image')) return;
                    const currentSrc = image.src;
                    const attrSrc = image.getAttribute('src');
                    const isMatch =
                        currentSrc === reportedSrc ||
                        attrSrc === reportedSrc ||
                        reportedSrc.includes(attrSrc || '___never___') ||
                        (attrSrc?.includes(reportedSrc) || false);
                    if (isMatch) {
                        image.classList.add('issue-highlight-image');
                        image.setAttribute('data-issue-id', issue.id);
                        Object.assign(image.style, {
                            outline: issue.state === 'closed' ? '4px solid #9ca3af' : '4px solid #3b82f6',
                            outlineOffset: '2px',
                            cursor: 'pointer',
                            filter: issue.state === 'closed' ? 'grayscale(0.5)' : 'brightness(0.9)',
                            transition: 'all 0.2s ease',
                        });
                    }
                });
            }
        }
    });
};

export function useIssueHighlighter(issues: TextIssue[], pathname: string, setPageTitle: (t: string) => void) {
    useEffect(() => {
        if (typeof document === 'undefined' || issues.length === 0) return;

        const currentPath = getPagePath(pathname);

        // Apply highlights immediately (may be early — content might not be loaded yet)
        reapplyHighlights(issues, currentPath);

        // Also retry after a short delay to handle Docusaurus SPA lazy-loaded content
        const retryTimeoutId = setTimeout(() => {
            reapplyHighlights(issues, currentPath);
        }, 600);

        let timeoutId: NodeJS.Timeout;

        const updatePageTitle = () => {
            const h1 = document.querySelector('h1')?.textContent;
            setPageTitle(h1 ? h1.toUpperCase() : 'CURRENT PAGE');
        };

        const observer = new MutationObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                reapplyHighlights(issues, currentPath);
                updatePageTitle();
            }, 300);
        });

        // Update immediately
        updatePageTitle();

        const container = document.querySelector('main') || document.body;
        observer.observe(container, { childList: true, subtree: true, characterData: true });

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
            clearTimeout(retryTimeoutId);
        };
    }, [pathname, issues, setPageTitle]);
}

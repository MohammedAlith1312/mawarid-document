import { TextIssue } from './types';

export const apiBase = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://mawarid-document.onrender.com';

export const fetchIssuesList = async (): Promise<TextIssue[]> => {
    try {
        const res = await fetch(`${apiBase}/api/issues/list`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (data.issues && Array.isArray(data.issues)) {
            return data.issues.map((i: any) => {
                const body = i.body || i.description || '';
                // Failsafe: If pageUrl is missing from backend, try to extract it from body
                let extractedUrl = i.pageUrl || '';
                if (!extractedUrl) {
                    const match = body.match(/(?:Page\s+)?URL[\s\S]*?(https?:\/\/[^\s\r\n\)\>]+)/i);
                    if (match) extractedUrl = match[1].trim();
                }

                return {
                    id: String(i.id),
                    text: i.selectedText || '',
                    issueUrl: i.url || '#',
                    pageUrl: extractedUrl,
                    issueNumber: i.issueNumber || 0,
                    title: i.title || 'No Title',
                    description: body,
                    state: (i.state || 'open').toLowerCase() as 'open' | 'closed',
                };
            });
        }
        return [];
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const createIssueApi = async (payload: { title: string, body: string }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('github_token') : null;
    const res = await fetch(`${apiBase}/api/issues/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create');
    return data;
};

export const updateIssueApi = async (number: number, title: string, body: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('github_token') : null;
    const res = await fetch(`${apiBase}/api/issues/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ number, title, body }),
    });
    if (!res.ok) throw new Error('Failed to update');
    return true;
};

export const closeIssueApi = async (number: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('github_token') : null;
    const res = await fetch(`${apiBase}/api/issues/close`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ number }),
    });
    if (!res.ok) throw new Error('Failed to close');
    return true;
};

export const commentIssueApi = async (number: number, comment: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('github_token') : null;
    const res = await fetch(`${apiBase}/api/issues/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ number, comment }),
    });
    if (!res.ok) throw new Error('Failed to comment');
    return true;
};

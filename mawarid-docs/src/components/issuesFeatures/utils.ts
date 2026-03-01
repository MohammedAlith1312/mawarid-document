export const getPagePath = (urlStr: string) => {
    if (!urlStr) return '';
    try {
        // Standardize by using a fake base for relative URL safety
        const u = new URL(urlStr, 'http://localhost');

        let path = u.pathname;

        // Handle hash-based routing (e.g. #/docs/intro)
        // If hash contains a slash, it's a route. If not, it's just an anchor (ignore it).
        if (u.hash && u.hash.includes('/')) {
            path = u.hash.split('?')[0].replace(/^#/, '');
        }

        // Deep Clean:
        // 1. Lowercase
        // 2. Remove query strings
        // 3. Remove trailing slashes
        // 4. Ensure it starts with /
        path = path.split('?')[0].toLowerCase();
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        if (!path.startsWith('/')) path = '/' + path;

        return path;
    } catch (error) {
        // Last resort fallback
        let path = urlStr.split('?')[0].split('#')[0].toLowerCase().trim();
        if (path.includes('://')) {
            const parts = path.split('://')[1].split('/');
            parts.shift();
            path = '/' + parts.join('/');
        }
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        if (!path.startsWith('/') && path.length > 0) path = '/' + path;
        return path || '/';
    }
};

export const calcPopupPosition = (rect: DOMRect, popupW = 320, popupH = 180) => {
    let left = rect.left + rect.width / 2 - popupW / 2;
    let top = rect.top - popupH - 12;
    if (top < 10) top = rect.bottom + 10;
    left = Math.max(10, Math.min(left, window.innerWidth - popupW - 10));
    top = Math.max(10, Math.min(top, window.innerHeight - popupH - 10));
    return { top, left };
};

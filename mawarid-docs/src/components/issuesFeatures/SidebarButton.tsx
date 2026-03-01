import React from 'react';

export function TextBlockSidebarButtons({
    onOpenSidebar,
    onOpenPageSidebar,
    onSync,
    isSyncing,
    title
}: {
    onOpenSidebar: () => void;
    onOpenPageSidebar: () => void;
    onSync: () => void;
    isSyncing: boolean;
    title?: string;
}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        const handleToggle = (e: any) => {
            setIsSidebarOpen(e.detail.isOpen);
        };
        window.addEventListener('tb-sidebar-toggle', handleToggle);
        return () => window.removeEventListener('tb-sidebar-toggle', handleToggle);
    }, []);

    if (isSidebarOpen) return null;

    return (
        <div style={{
            paddingLeft: 'var(--ifm-toc-padding-vertical)',
            backgroundColor: 'var(--ifm-background-color)',
            marginBottom: '30px'
        }}>
            <button
                id="tb-page-issues-btn"
                onClick={onOpenPageSidebar}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title="Issues on this page"
                style={{
                    background: 'transparent',
                    position: 'fixed',
                    top: '70px',
                    border: 'none',
                    // padding: '6px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    color: isHovered ? 'var(--ifm-color-primary)' : 'var(--ifm-toc-link-color)',
                    transition: 'color 0.2s',
                    textAlign: 'left',
                    width: '100%',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 640 640"
                    fill="currentColor">
                    <path d="M128 64C92.7 64 64 92.7 64 128L64 
                    512C64 547.3 92.7 576 128 576L308 576C285.3 
                    544.5 272 505.8 272 464C272 363.4 349.4 280.8 
                    448 272.7L448 234.6C448 217.6 441.3 201.3 429.3 
                    189.3L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 
                    64zM389.5 240L296 240C282.7 240 272 229.3 272 
                    216L272 122.5L389.5 240zM464 608C543.5 608 608 543.5 608 
                    464C608 384.5 543.5 320 464 320C384.5 320 320 384.5 320 
                    464C320 543.5 384.5 608 464 608zM464 508C475 508 484 517 
                    484 528C484 539 475 548 464 548C453 548 444 539 444 528C444 
                    517 453 508 464 508zM464 368C472.8 368 480 375.2 480 384L480 
                    464C480 472.8 472.8 480 464 480C455.2 480 448 472.8 
                    448 464L448 384C448 375.2 455.2 368 464 368z" />
                </svg>
                <span
                    style={{
                        fontSize: '14px',
                        margin: 0,
                        fontWeight: 600,
                        fontFamily: 'inherit'
                    }}
                >
                    {title}
                </span>
            </button>

        </div>
    );
}

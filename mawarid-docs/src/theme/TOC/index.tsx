import React, { type ReactNode, useState } from 'react';
import TOC from '@theme-original/TOC';
import type TOCType from '@theme/TOC';
import type { WrapperProps } from '@docusaurus/types';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { TextBlockSidebarButtons } from '@site/src/components/issuesFeatures/SidebarButton';

type Props = WrapperProps<typeof TOCType>;

export default function TOCWrapper(props: Props): ReactNode {
    return (
        <>
            {/* Page Issue Button */}
            <BrowserOnly>
                {() => (
                    <TextBlockSidebarButtons
                        title="Issues on this page"
                        onOpenSidebar={() => window.dispatchEvent(new CustomEvent('tb-open-sidebar'))}
                        onOpenPageSidebar={() => window.dispatchEvent(new CustomEvent('tb-open-page-sidebar'))}
                        onSync={() => { }}
                        isSyncing={false}
                    />
                )}
            </BrowserOnly>

            {/* Render TOC directly to preserve its position: sticky behavior */}

            <TOC {...props} />

        </>
    );
}
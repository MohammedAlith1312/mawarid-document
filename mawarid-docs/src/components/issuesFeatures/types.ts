export interface TextIssue {
    id: string;
    text: string;
    issueUrl: string;
    issueNumber: number;
    title: string;
    description: string;
    state: 'open' | 'closed';
    pageUrl: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    pinned: number; // 0 = not pinned, 1 = pinned
    created: string;
    modified: string;
}
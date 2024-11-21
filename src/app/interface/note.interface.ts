export interface Note {
    uuid: string;
    title: string;
    content: string;
    pinned: boolean;
    created: Date;
    modified: Date;
}

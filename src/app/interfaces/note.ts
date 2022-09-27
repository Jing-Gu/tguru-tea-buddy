export interface Note {
  id: number;
  title: string;
  content: string;
  abstract: string;
  creationTime: Date;
  modifiedTime?: Date | null;
  pinned?: boolean | null;
}

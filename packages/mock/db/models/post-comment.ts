import { type EntityTable } from 'dexie';

export type PostComment = EntityTable<
  {
    id: number;
    userId: number;
    pid: number | null;
    postId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  },
  'id'
>;

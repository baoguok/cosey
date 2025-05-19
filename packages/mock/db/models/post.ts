import { type EntityTable } from 'dexie';

export type Post = EntityTable<
  {
    id: number;
    postTypeId: number;
    title: string;
    content: string;
    digest: string;
    cover: string;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date;
    scheduledAt: Date;
    publishedBy: number;
    publishedAt: Date;
    deletedBy: number | null;
    deletedAt: Date | null;
  },
  'id'
>;

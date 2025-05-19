import { type EntityTable } from 'dexie';

export type Posttype = EntityTable<
  {
    id: number;
    pid: number | null;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

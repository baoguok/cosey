import { type EntityTable } from 'dexie';

export type Role = EntityTable<
  {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

import { type EntityTable } from 'dexie';

export type ConfigGroup = EntityTable<
  {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

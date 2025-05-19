import { type EntityTable } from 'dexie';

export type EnumItem = EntityTable<
  {
    id: number;
    enumId: number;
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

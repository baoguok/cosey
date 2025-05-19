import { type EntityTable } from 'dexie';

export type Enum = EntityTable<
  {
    id: number;
    name: string;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

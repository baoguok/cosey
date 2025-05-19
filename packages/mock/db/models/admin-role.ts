import { type EntityTable } from 'dexie';

export type AdminRole = EntityTable<
  {
    id: number;
    roleId: number;
    adminId: number;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

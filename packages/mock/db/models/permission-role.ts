import { type EntityTable } from 'dexie';

export type PermissionRole = EntityTable<
  {
    id: number;
    roleId: number;
    permissionId: number;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

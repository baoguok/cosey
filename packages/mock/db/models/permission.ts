import { type EntityTable } from 'dexie';

export interface PermissionRow {
  id: number;
  pid: number | null;
  name: string;
  subject: string;
  action: string;
  conditions: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Permission = EntityTable<PermissionRow, 'id'>;

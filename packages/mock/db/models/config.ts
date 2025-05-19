import { type EntityTable } from 'dexie';

export type Config = EntityTable<
  {
    id: number;
    groupId: number;
    type: 'text' | 'textarea' | 'number' | 'bool' | 'image' | 'album';
    name: string;
    value: string | number | boolean | string[] | null;
    key: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

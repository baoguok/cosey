import { type EntityTable } from 'dexie';

export type Asset = EntityTable<
  {
    id: number;
    dataURL: string;
    uuid: string;
    name: string;
    size: number;
    type: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

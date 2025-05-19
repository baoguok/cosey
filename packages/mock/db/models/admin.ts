import { type EntityTable } from 'dexie';

export type Admin = EntityTable<
  {
    id: number;
    username: string;
    password: string;
    nickname: string;
    avatar: string;
    superAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

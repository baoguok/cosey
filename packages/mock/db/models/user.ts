import { type EntityTable } from 'dexie';

export type User = EntityTable<
  {
    id: number;
    nickname: string;
    mobile: number;
    name: string;
    gender: string;
    birthday: Date;
    constellation: string;
    height: number;
    weight: number;
    qualification: string;
    trait: string;
    friendshipType: string;
    hobbies: string[];
    signature: string;
    avatar: string;
    address: string;
    silent: number;
    createdAt: Date;
    updatedAt: Date;
  },
  'id'
>;

import Dexie from 'dexie';

import { type DB } from './types';
import { seed } from './seeder';

export const db = new Dexie('CoseyAdminDB') as DB;

export const schema = {
  admins: '++id, username, password, nickname, avatar, superAdmin, createdAt, updatedAt',
  roles: '++id, name, createdAt, updatedAt',
  permissions: '++id, pid, action, subject, conditions, name, order, createdAt, updatedAt',
  permissionRoles: '++id, roleId, permissionId, createdAt, updatedAt',
  adminRoles: '++id, roleId, adminId, createdAt, updatedAt',
  users:
    '++id, nickname, mobile, name, gender, birthday, constellation, height, weight, qualification, trait, friendshipType, hobbies, signature, avatar, address, silent, createdAt, updatedAt',
  assets: '++id, dataURL, uuid, name, size, type, url, createdAt, updatedAt',
  enums: '++id, name, remark, createdAt, updatedAt',
  enumItems: '++id, enumId, name, value, createdAt, updatedAt',
  posts:
    '++id, postTypeId, title, content, digest, cover, createdBy, createdAt, updatedBy, updatedAt, scheduledAt, publishedBy, publishedAt, deletedBy, deletedAt',
  postTypes: '++id, pid, name, description, createdAt, updatedAt',
  postComments: '++id, userId, pid, postId, content, createdAt, updatedAt, deletedAt',
  configGroups: '++id, name, createdAt, updatedAt',
  configs: '++id, groupId, type, name, value, key, createdAt, updatedAt',
};

// 数据库表设计
db.version(1).stores(schema);

/**
 * 重置数据库
 */
export async function resetDB() {
  await db.delete();
  await db.open();
  await seed(db);
}

/**
 * 初始化数据库
 */
export async function initSeed() {
  if (!localStorage.getItem('mockSeeded')) {
    resetDB().then(() => {
      localStorage.setItem('mockSeeded', 'true');
    });
  }
}

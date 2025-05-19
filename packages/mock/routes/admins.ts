import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { omit, pick } from 'lodash-es';
import { Result } from '../utils/Result';
import { Resource } from '../utils/Resource';
import { validateEditAdmin } from '../validator/admins';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/rbac/admins';

  async function deleteRoles(id: number) {
    const rows = await db.adminRoles.where('adminId').equals(id).toArray();
    const ids = rows.map((item) => item.id);
    await db.adminRoles.bulkDelete(ids);
  }

  async function updateRoles(id: number, body: any) {
    const roleIds = body.roles as number[];
    if (roleIds) {
      await deleteRoles(id);

      if (roleIds.length > 0) {
        await db.adminRoles.bulkAdd(
          roleIds.map((roleId) => ({
            roleId,
            adminId: id,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        );
      }
    }
  }

  new Resource(prefix, db.admins, {
    list: {
      async after(rows) {
        await Promise.all(
          rows.map(async (row) => {
            delete row.password;

            const adminRoleRows = await db.adminRoles
              .where({
                adminId: row.id,
              })
              .toArray();

            row.roles = await Promise.all(
              adminRoleRows.map(async (adminRoleRow) => {
                return await db.roles.get({
                  id: adminRoleRow.roleId,
                });
              }),
            );
          }),
        );

        return rows;
      },
    },
    details: {
      after(row) {
        return omit(row, ['password']);
      },
    },
    create: {
      before(body) {
        return {
          ...pick(body, ['username', 'password', 'nickname', 'avatar']),
          superAdmin: false,
        };
      },
      async after(id, body) {
        await updateRoles(id, body);
      },
    },
    update: {
      validate(req, res) {
        if (!validateEditAdmin(req.body)) {
          return res.json(Result.error(400, validateEditAdmin));
        }
      },
      before(body) {
        return pick(body, ['username', 'password', 'nickname', 'avatar']);
      },
      async after(id, body) {
        await updateRoles(id, body);
      },
    },
    delete: {
      async after(id) {
        await deleteRoles(id);
      },
    },
  }).intercept(interceptor);
}

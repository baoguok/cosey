import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';
import { Result } from '../utils/Result';
import { difference } from 'lodash-es';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/rbac/roles';

  interceptor.get(`${prefix}/:roleId/permissions`, async ({ req, res }) => {
    const { roleId } = req.params;

    const permissionRoles = await db.permissionRoles
      .where({
        roleId: +roleId,
      })
      .toArray();

    const permissions = permissionRoles.map((item) => item.permissionId);

    res.json(Result.success(permissions));
  });

  interceptor.patch<
    { roleId: string },
    {
      permissionIds: number[];
    }
  >(`${prefix}/:roleId/permissions`, async ({ req, res }) => {
    const { roleId } = req.params;
    const { permissionIds } = req.body!;

    const row = await db.roles.get(+roleId);
    if (!row) {
      return res.json(Result.error(400));
    }

    const result = await db.transaction('rw', db.roles, db.permissionRoles, async () => {
      const oldPermissionIds = (
        await db.permissionRoles
          .where({
            roleId: +roleId,
          })
          .toArray()
      ).map((row) => row.permissionId);

      const insertPermissionIds = difference(permissionIds, oldPermissionIds);
      const deletePermissiontIds = difference(oldPermissionIds, permissionIds);

      await db.permissionRoles.where('permissionId').anyOf(deletePermissiontIds).delete();
      await db.permissionRoles.bulkAdd(
        insertPermissionIds.map((pid) => {
          return {
            roleId: +roleId,
            permissionId: pid,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
      );
    });

    res.json(Result.success(result));
  });

  new Resource(prefix, db.roles).intercept(interceptor);
}

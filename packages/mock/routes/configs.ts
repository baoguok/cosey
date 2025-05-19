import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/system/configs';

  new Resource(prefix, db.configs, {
    list: {
      constrain(req, collOrTable) {
        const { groupId, name, key } = req.query;
        return collOrTable.filter((row) => {
          return (
            (!groupId || row.groupId == groupId) &&
            (!name || row.name.includes(name)) &&
            (!key || row.key.includes(key))
          );
        });
      },
      async after(rows) {
        await Promise.all(
          rows.map(async (row) => {
            row.group = await db.configGroups.get({
              id: row.groupId,
            });
          }),
        );

        return rows;
      },
    },
  }).intercept(interceptor);
}

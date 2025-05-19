import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';
import { Result } from '../utils/Result';

export default function register(interceptor: RequestInterceptor) {
  const enumsPrefix = '/system/enums';
  const enumItemsPrefix = enumsPrefix + '/:enumId/enum-items';
  const enumItemsQueryPrefix = '/system/enum-items';

  new Resource(enumsPrefix, db.enums, {
    list: {
      constrain(req, collOrTable) {
        const { name, remark } = req.query;
        return collOrTable.filter((row) => {
          return (!name || row.name.includes(name)) && (!remark || row.remark.includes(remark));
        });
      },
    },
  }).intercept(interceptor);

  interceptor.get(enumItemsQueryPrefix, async ({ req, res }) => {
    const { enumName } = req.query;

    const enumRow = await db.enums.get({
      name: enumName,
    });
    if (!enumRow) {
      return res.json(Result.error(404));
    }

    const rows = await db.enumItems
      .where({
        enumId: enumRow.id,
      })
      .toArray();

    return res.json(Result.success(rows));
  });

  new Resource(enumItemsPrefix, db.enumItems, {
    list: {
      constrain(req, collOrTable) {
        const { name, value } = req.query;
        return collOrTable.filter((row) => {
          return (!name || row.name.includes(name)) && (!value || row.value.includes(value));
        });
      },
    },
  }).intercept(interceptor);
}

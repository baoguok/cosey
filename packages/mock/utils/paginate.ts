import { ServerRequest } from '@cosey/request-interceptor';
import type { Collection, Table } from 'dexie';

/**
 * 分页
 */
export async function paginate(
  req: ServerRequest,
  collOrTable: Collection | Table,
  callback?: (rows: any[], req: ServerRequest) => any[] | Promise<any[]>,
) {
  const count = await collOrTable.count();

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  let rows = await collOrTable
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  rows = (await callback?.(rows, req)) || rows;

  return {
    total: count,
    list: rows,
  };
}

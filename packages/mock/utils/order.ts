import { ServerRequest } from '@cosey/request-interceptor';
import { type Collection, type Table } from 'dexie';

export function order(req: ServerRequest, table: Table) {
  let collection: Collection | undefined;
  if (req.query.orderBy) {
    collection = table.orderBy(req.query.orderBy);

    if (req.query.orderType === 'desc') {
      collection = collection.reverse();
    }
  }
  return collection || table;
}

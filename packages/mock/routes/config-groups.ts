import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/system/config-groups';

  new Resource(prefix, db.configGroups).intercept(interceptor);
}

import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/blog/post-types';

  new Resource(prefix, db.postTypes).intercept(interceptor);
}

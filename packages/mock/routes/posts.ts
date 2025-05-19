import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/blog/posts';

  new Resource(prefix, db.posts, {
    list: {
      async after(rows, req) {
        await Promise.all(
          rows.map(async (row) => {
            delete row.content;
            row.postType = await db.postTypes.get({
              id: row.postTypeId,
            });
          }),
        );

        const { postTypeName, title } = req.query;

        return rows.filter((row) => {
          return (
            (!postTypeName || row.postType.name.includes(postTypeName)) &&
            (!title || row.title.includes(title))
          );
        });
      },
    },
  }).intercept(interceptor);
}

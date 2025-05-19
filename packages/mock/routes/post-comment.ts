import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { Resource } from '../utils/Resource';
import { pick } from 'lodash-es';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/blog/post-comments';

  new Resource(prefix, db.postComments, {
    list: {
      constrain(req, tableOrColl) {
        const { postId, userId } = req.query;

        return tableOrColl.filter((row) => {
          return (!postId || row.postId == postId) && (!userId || row.userId == userId);
        });
      },
      async after(rows) {
        await Promise.all(
          rows.map(async (row) => {
            row.post = pick(
              await db.posts.get({
                id: row.postId,
              }),
              ['id', 'title'],
            );
            row.user = pick(
              await db.users.get({
                id: row.userId,
              }),
              ['id', 'nickname'],
            );
          }),
        );
        return rows;
      },
    },
  }).intercept(interceptor);
}

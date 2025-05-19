import { RequestInterceptor } from '@cosey/request-interceptor';
import { Result } from '../utils/Result';
import * as mock from '@gunny/mock';
import { db } from '../db';

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/statistics';

  interceptor.get(`${prefix}/overview`, ({ res }) => {
    return res.json(
      Result.success({
        total_money: mock.random(1e6, 2e6),
        total_user: mock.random(1e5, 2e5),
        total_verified_user: mock.random(1e4, 2e4),
        total_device: mock.random(0.5e5, 1e5),
      }),
    );
  });

  interceptor.get<{
    type: 'day' | 'week' | 'month' | 'year';
  }>(`${prefix}/trend`, ({ req, res }) => {
    const type = req.query.type;

    function getData() {
      switch (type) {
        case 'day':
          return Array.from({ length: 24 }).map((_, i) => ({
            label: i + '时',
            value: mock.random(100, 1000),
          }));
        case 'week':
          return Array.from({ length: 7 }).map((_, i) => ({
            label: `周${['一', '二', '三', '四', '五', '六', '日'][i]}`,
            value: mock.random(100, 1000),
          }));
        case 'month':
          return Array.from({ length: 30 }).map((_, i) => ({
            label: `${i + 1}号`,
            value: mock.random(100, 1000),
          }));
        case 'year':
          return Array.from({ length: 12 }).map((_, i) => ({
            label: `${i + 1}月`,
            value: mock.random(100, 1000),
          }));
      }
    }

    return res.json(Result.success(getData()));
  });

  interceptor.get(`${prefix}/education`, async ({ res }) => {
    const data = await Promise.all(
      mock.qualifications.map(async (qualification) => {
        const male = await db.users
          .where('qualification')
          .equals(qualification)
          .and((x) => x.gender === '男')
          .count();

        const female = await db.users
          .where('qualification')
          .equals(qualification)
          .and((x) => x.gender === '女')
          .count();

        return {
          qualification,
          male,
          female,
        };
      }),
    );

    return res.json(Result.success(data));
  });

  interceptor.get(`${prefix}/stature`, async ({ res }) => {
    const data = (await db.users.toArray()).map((row) => {
      return {
        height: row.height,
        weight: row.weight,
        gender: row.gender,
      };
    });

    return res.json(Result.success(data));
  });

  interceptor.get(`${prefix}/hobby`, async ({ res }) => {
    const male = await Promise.all(
      mock.hobbies.map(async (hobby) => {
        const count = await db.users
          .where({ gender: '男' })
          .filter((row) => row.hobbies.includes(hobby))
          .count();

        return {
          hobby,
          count,
        };
      }),
    );

    const female = await Promise.all(
      mock.hobbies.map(async (hobby) => {
        const count = await db.users
          .where({ gender: '女' })
          .filter((row) => row.hobbies.includes(hobby))
          .count();

        return {
          hobby,
          count,
        };
      }),
    );

    return res.json(
      Result.success({
        male,
        female,
      }),
    );
  });

  interceptor.get(`${prefix}/constellation`, async ({ res }) => {
    const data = await Promise.all(
      mock.zodiacSigns.map(async (zodiacSign) => {
        const count = await db.users
          .filter((row) => row.constellation.includes(zodiacSign))
          .count();

        return {
          zodiacSign,
          count,
        };
      }),
    );

    return res.json(Result.success(data));
  });
}

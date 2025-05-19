import { ajv } from './ajv';

/**
 * 验证编辑用户接口数据
 */
export const validateEditAdmin = ajv.compile({
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    nickname: {
      type: 'string',
    },
    avatar: {
      type: ['string', 'null'],
    },
    roles: {
      type: ['array', 'null'],
      items: {
        type: 'number',
      },
    },
  },
});

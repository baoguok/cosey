import { ajv } from './ajv';

/**
 * 验证创建资产接口数据
 */
export const validateCreateAsset = ajv.compile({
  type: 'object',
  properties: {
    file: {
      type: 'object',
    },
  },
});

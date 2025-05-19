import { ajv } from './ajv';

/**
 * 验证整数
 */
export const validateIngeter = ajv.compile({
  type: 'integer',
});

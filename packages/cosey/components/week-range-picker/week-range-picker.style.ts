import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoWeekRangePicker', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      '--el-date-editor-width': 300,
    },
  };
});

import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('LayoutSetting', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      maxWidth: '80%',

      [`${componentCls}-header`]: {
        marginBlockEnd: 0,
      },
    },
  };
});

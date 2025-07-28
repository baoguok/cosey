import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('Card', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      backgroundColor: token.colorBgContainer,
      paddingInline: token.sizeSM,
      paddingBlock: token.size,
    },
  };
});

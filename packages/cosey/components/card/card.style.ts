import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoCard', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      backgroundColor: token.colorBgContainer,
      paddingInline: token.sizeSM,
      paddingBlock: token.size,
    },
  };
});

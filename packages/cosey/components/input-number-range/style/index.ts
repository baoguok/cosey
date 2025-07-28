import { getSimpleStyleHook } from 'cosey/components';

export default getSimpleStyleHook('InputNumberRange', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      display: 'flex',
      gap: token.sizeXXS,

      '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
      },
    },
  };
});

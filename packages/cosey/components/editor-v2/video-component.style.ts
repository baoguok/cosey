import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoEditorV2Video', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      margin: 1,

      '&.is-active': {
        outline: `2px solid ${token.colorPrimaryBorder}`,
      },

      [`${componentCls}-wrapper`]: {
        position: 'relative',
        display: 'inline-flex',
      },
    },
  };
});

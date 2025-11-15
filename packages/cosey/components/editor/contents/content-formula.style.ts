import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoEditorContentFormula', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&.is-active': {
        outline: `2px solid ${token.colorPrimaryBorder}`,
      },
    },
  };
});

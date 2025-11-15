import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoEditorV2Placeholder', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: token.paddingSM,
      marginBlock: token.marginSM,
      textAlign: 'left',
      color: token.colorTextPlaceholder,
      pointerEvents: 'none',
    },
  };
});

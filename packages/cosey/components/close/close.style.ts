import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoClose', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      insetBlockStart: 40,
      insetInlineEnd: 40,
      zIndex: 10,
      boxSizing: 'border-box',
      display: 'flex',
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: token.fontSizeHeading3,
      color: token.colorWhite,
      borderRadius: '50%',
      backgroundColor: token.colorTextSecondary,
      opacity: 0.8,
      cursor: 'pointer',
      userSelect: 'none',
    },
  };
});

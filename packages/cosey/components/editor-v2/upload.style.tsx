import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoEditorUpload', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&::after': {
        position: 'absolute',
        inset: 0,
        content: '""',
        backgroundColor: token.colorBgContainer,
        opacity: 0.8,
      },

      [`${componentCls}-content`]: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: token.lineHeight,
      },

      [`${componentCls}-progress`]: {
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
      },
    },
  };
});

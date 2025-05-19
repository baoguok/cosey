import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutAuth', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      width: '100vw',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: token.colorBgLayout,

      [`${componentCls}-bg`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(154deg, transparent 35%, ${token.colorPrimaryBg} 35%, ${token.colorPrimaryBgHover} 50%, ${token.colorPrimaryBg} 65%, transparent 65%)`,
        filter: 'blur(100px)',
      },

      [`${componentCls}-main`]: {
        position: 'relative',
        zIndex: 2,
        margin: token.marginLG,
        width: 480,
        padding: 72,
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorBgContainer,

        [`@media (max-width: ${token.screenMD}px)`]: {
          padding: token.paddingLG,
        },
      },

      [`${componentCls}-brand`]: {
        position: 'fixed',
        top: token.size,
        left: token.size,
        zIndex: 10,
      },

      [`${componentCls}-widget`]: {
        position: 'fixed',
        top: token.size,
        right: token.size,
        zIndex: 10,
        display: 'flex',
        paddingInline: token.padding,
        paddingBlock: token.paddingXS,
        columnGap: token.sizeXS,
        background: token.colorFillContent,
        borderRadius: 9999,
      },
    },
  };
});

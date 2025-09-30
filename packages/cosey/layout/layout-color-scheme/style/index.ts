import { getGlobalStyleHook, getSimpleStyleHook, rotation45 } from '../../../components';

export const useGlobalStyle = getGlobalStyleHook('LayoutColorSchemeGlobal', () => {
  return {
    '::view-transition-old(root), ::view-transition-new(root)': {
      animation: 'none',
      mixBlendMode: 'normal',
    },

    '::view-transition-old(root)': {
      zIndex: 1,
    },

    '::view-transition-new(root)': {
      zIndex: 2147483646,
    },

    '.dark::view-transition-old(root)': {
      zIndex: 2147483646,
    },

    '.dark::view-transition-new(root)': {
      zIndex: 1,
    },
  };
});

export default getSimpleStyleHook('CoLayoutColorScheme', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      [`${componentCls}-icon`]: {
        '&.is-light': {
          animationName: rotation45,
          animationDuration: '1s',
        },
      },
    },
  };
});

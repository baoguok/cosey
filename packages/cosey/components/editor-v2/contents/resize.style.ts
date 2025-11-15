import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoResizeV2', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      display: 'none',
      outline: `3px solid ${token.colorPrimaryBorder}`,
      pointerEvents: 'none',

      '&.is-show': {
        display: 'block',
      },

      [`${componentCls}-corner`]: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: token.colorPrimaryBorderHover,
        pointerEvents: 'auto',

        '&-nw': {
          cursor: 'nw-resize',
          insetBlockStart: 0,
          insetInlineStart: 0,
          transform: 'translate(-50%, -50%)',
        },
        '&-ne': {
          cursor: 'ne-resize',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          transform: 'translate(50%, -50%)',
        },
        '&-sw': {
          cursor: 'sw-resize',
          insetBlockEnd: 0,
          insetInlineStart: 0,
          transform: 'translate(-50%, 50%)',
        },
        '&-se': {
          cursor: 'se-resize',
          insetBlockEnd: 0,
          insetInlineEnd: 0,
          transform: 'translate(50%, 50%)',
        },
      },

      [`${componentCls}-size`]: {
        position: 'fixed',
        left: token.sizeXS,
        top: token.sizeXS,
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXXS,
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        borderRadius: token.borderRadius,
        backgroundColor: token.colorText,
        color: token.colorBgBase,
      },
    },
  };
});

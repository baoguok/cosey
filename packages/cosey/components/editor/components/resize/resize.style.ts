import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('EditorResize', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineStart: 0,
      display: 'none',
      outline: `3px solid ${token.colorPrimaryBorder}`,

      '&.is-show': {
        display: 'block',
      },

      [`${componentCls}-corner`]: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: token.colorPrimary,

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

      [`${componentCls}-align`]: {
        position: 'absolute',
        insetBlockEnd: '100%',
        insetInlineStart: '50%',
        display: 'flex',
        columnGap: token.padding,
        paddingInline: token.paddingXS,
        paddingBlock: token.paddingXXS,
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
        backgroundColor: token.colorBgElevated,
        boxShadow: token.boxShadow,
        transform: `translate(-50%, -4px)`,
      },

      [`${componentCls}-size`]: {
        position: 'absolute',
        insetInlineEnd: token.sizeXXS,
        insetBlockEnd: token.sizeXXS,
        paddingInline: token.paddingXXS,
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        whiteSpace: 'nowrap',
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadiusXS,
        backgroundColor: token.colorBgElevated,

        '&.is-outside': {
          insetInlineStart: '100%',
          insetInlineEnd: 'auto',
          insetBlockStart: '100%',
          insetBlockEnd: 'auto',
          marginInlineStart: token.sizeXS,
          marginBlockStart: token.sizeXS,
        },
      },
    },
  };
});

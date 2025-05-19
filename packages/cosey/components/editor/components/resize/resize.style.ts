import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('EditorResize', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      top: 0,
      left: 0,
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
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
        },
        '&-ne': {
          cursor: 'ne-resize',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
        },
        '&-sw': {
          cursor: 'sw-resize',
          bottom: 0,
          left: 0,
          transform: 'translate(-50%, 50%)',
        },
        '&-se': {
          cursor: 'se-resize',
          bottom: 0,
          right: 0,
          transform: 'translate(50%, 50%)',
        },
      },

      [`${componentCls}-align`]: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
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
        right: token.sizeXXS,
        bottom: token.sizeXXS,
        paddingInline: token.paddingXXS,
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        whiteSpace: 'nowrap',
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadiusXS,
        backgroundColor: token.colorBgElevated,

        '&.is-outside': {
          left: '100%',
          right: 'auto',
          top: '100%',
          bottom: 'auto',
          marginLeft: token.sizeXS,
          marginTop: token.sizeXS,
        },
      },
    },
  };
});

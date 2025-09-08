import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoFromGroup', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&.is-bordered': {
        position: 'relative',
        marginBlock: token.marginLG,
        padding: token.paddingMD,
        paddingBlockStart: token.paddingLG,
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadius,

        '&.is-collapsed': {
          paddingBlockEnd: 0,
        },
      },
      [`${componentCls}-title`]: {
        position: 'absolute',
        top: 0,
        paddingInline: token.paddingMD,
        fontSize: token.fontSize,
        fontWeight: token.fontWeightStrong,
        color: token.colorTextBase,
        backgroundColor: token.colorBgContainer,

        '&.is-left': {
          left: token.sizeMD,
          transform: 'translateY(-50%)',
        },
        '&.is-center': {
          left: '50%',
          transform: 'translate(-50%) translateY(-50%)',
        },
        '&.is-right': {
          right: token.sizeMD,
          transform: 'translateY(-50%)',
        },
      },
    },
  };
});

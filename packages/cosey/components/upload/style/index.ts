import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getMediaCardStyle } from '../../media-card/style';

export interface ComponentToken {}

export interface UploadToken extends FullToken<'Upload'> {}

const getUploadStyle: GenerateStyle<UploadToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      gap: token.sizeXS,

      [`${componentCls}-select`]: {
        ...getMediaCardStyle(token),
        cursor: 'pointer',
        border: `${token.lineWidth} dashed ${token.colorBorderSecondary}`,
        backgroundColor: token.colorFillAlter,

        '&:hover': {
          borderColor: token.colorPrimaryBorder,
        },
      },

      [`${componentCls}-item`]: {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        borderRadius: token.borderRadiusLG,
      },

      [`${componentCls}-status`]: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: token.sizeXXS,
        borderRadius: 'inherit',
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        backgroundColor: 'var(--el-mask-color)',
        backgroundClip: 'content-box',
      },

      [`${componentCls}-progress-text`]: {
        fontSize: token.fontSizeSM,
      },

      [`${componentCls}-actions`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      [`${componentCls}-remove`]: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        width: token.sizeMD,
        height: token.sizeMD,
        paddingBlockEnd: token.paddingXXS,
        paddingInlineStart: token.paddingXXS,
        alignItems: 'center',
        justifyContent: 'center',
        borderEndStartRadius: 9999,
        color: token.colorWhite,
        transitionDuration: token.motionDurationFast,
        backgroundColor: 'rgba(0,0,0,.85)',
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: 'rgba(0,0,0,.95)',
        },
      },
    },
  };
};

export default getStyleHook('Upload', (token) => {
  return [getUploadStyle(token)];
});

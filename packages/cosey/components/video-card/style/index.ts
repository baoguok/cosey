import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getMediaCardStyle } from '../../media-card/style';

export interface ComponentToken {}

export interface VideoCardToken extends FullToken<'VideoCard'> {}

const getVideoCardStyle: GenerateStyle<VideoCardToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      cursor: 'pointer',
      border: 'none',
      background: 'black',

      [`${componentCls}-video`]: {
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },

      [`${componentCls}-play-mask`]: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: token.colorWhite,
      },

      [`${componentCls}-play-icon`]: {
        filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.15))',
      },
    },
  };
};

export default getStyleHook('VideoCard', (token) => {
  return [getVideoCardStyle(token)];
});

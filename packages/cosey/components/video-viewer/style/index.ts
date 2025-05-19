import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface VideoViewerToken extends FullToken<'VideoViewer'> {}

const getVideoViewerStyle: GenerateStyle<VideoViewerToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&:focus': {
        outline: 'none',
      },

      [`${componentCls}-video`]: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      },
    },
  };
};

export default getStyleHook('VideoViewer', (token) => {
  return [getVideoViewerStyle(token)];
});

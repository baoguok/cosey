import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface AudioViewerToken extends FullToken<'AudioViewer'> {}

const getAudioViewerStyle: GenerateStyle<AudioViewerToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:focus': {
        outline: 'none',
      },
    },
  };
};

export default getStyleHook('AudioViewer', (token) => {
  return [getAudioViewerStyle(token)];
});

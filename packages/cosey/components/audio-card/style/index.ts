import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getMediaCardFileNameStyle, getMediaCardStyle } from '../../media-card/style';

export interface ComponentToken {}

export interface AudioCardToken extends FullToken<'AudioCard'> {}

const getAudioCardStyle: GenerateStyle<AudioCardToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      ...getMediaCardFileNameStyle(token),
      cursor: 'pointer',
      background: token.colorFillTertiary,
    },
  };
};

export default getStyleHook('AudioCard', (token) => {
  return [getAudioCardStyle(token)];
});

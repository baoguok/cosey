import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getMediaCardStyle } from '../../media-card/style';

export interface ComponentToken {}

export interface ImageCardToken extends FullToken<'ImageCard'> {}

const getImageCardStyle: GenerateStyle<ImageCardToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
    },
  };
};

export default getStyleHook('ImageCard', (token) => {
  return [getImageCardStyle(token)];
});

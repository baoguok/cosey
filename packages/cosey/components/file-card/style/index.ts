import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getMediaCardFileNameStyle, getMediaCardStyle } from '../../media-card/style';

export interface ComponentToken {}

export interface FileCardToken extends FullToken<'FileCard'> {}

const getFileCardStyle: GenerateStyle<FileCardToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      ...getMediaCardFileNameStyle(token),
      backgroundColor: token.colorFillTertiary,
    },
  };
};

export default getStyleHook('FileCard', (token) => {
  return [getFileCardStyle(token)];
});

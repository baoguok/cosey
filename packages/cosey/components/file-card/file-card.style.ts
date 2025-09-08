import { getSimpleStyleHook } from '../theme';
import { getMediaCardFileNameStyle, getMediaCardStyle } from '../media-card/media-card.style';

export default getSimpleStyleHook('CoFileCard', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      ...getMediaCardFileNameStyle(token),
      backgroundColor: token.colorFillTertiary,
    },
  };
});

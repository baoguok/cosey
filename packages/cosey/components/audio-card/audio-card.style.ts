import { getSimpleStyleHook } from '../theme';
import { getMediaCardFileNameStyle, getMediaCardStyle } from '../media-card/media-card.style';

export default getSimpleStyleHook('CoAudioCard', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
      ...getMediaCardFileNameStyle(token),
      cursor: 'pointer',
      background: token.colorFillTertiary,
    },
  };
});

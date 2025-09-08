import { getSimpleStyleHook } from '../theme';
import { getMediaCardStyle } from '../media-card/media-card.style';

export default getSimpleStyleHook('CoImageCard', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getMediaCardStyle(token),
    },
  };
});

import { getHljs } from '../../highlight/style/hljs';
import { getGlobalStyleHook } from '../../theme';

export default getGlobalStyleHook('GlobalHighlight', () => {
  return getHljs();
});

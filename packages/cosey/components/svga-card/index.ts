import { withInstall } from '../utils';
import SvgaCard from './svga-card';

export * from './svga-card.api';

const _SvgaCard = withInstall(SvgaCard);

export { _SvgaCard as SvgaCard };
export default _SvgaCard;

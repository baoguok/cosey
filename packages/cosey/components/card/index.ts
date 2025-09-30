import { withInstall } from '../utils';
import Card from './card';

export * from './card.api';

const _Card = withInstall(Card);

export { _Card as Card };
export default _Card;

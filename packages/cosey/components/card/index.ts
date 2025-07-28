import { withInstall } from '../utils';
import Card from './card.vue';

export * from './card';

const _Card = withInstall(Card);

export { _Card as Card };
export default _Card;

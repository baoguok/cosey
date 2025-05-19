import { withInstall } from '../utils';
import MediaCard from './media-card.vue';

export * from './media-card';

const _MediaCard = withInstall(MediaCard);

export { _MediaCard as MediaCard };
export default _MediaCard;

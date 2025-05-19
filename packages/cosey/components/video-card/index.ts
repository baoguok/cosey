import { withInstall } from '../utils';
import VideoCard from './video-card.vue';

export * from './video-card';

const _VideoCard = withInstall(VideoCard);

export { _VideoCard as VideoCard };
export default _VideoCard;

import { withInstall } from '../utils';
import VideoCard from './video-card';

export * from './video-card.api';

const _VideoCard = withInstall(VideoCard);

export { _VideoCard as VideoCard };
export default _VideoCard;

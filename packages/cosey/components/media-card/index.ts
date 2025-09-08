import { withInstall } from '../utils';
import MediaCard from './media-card';

export * from './media-card.api';

const _MediaCard = withInstall(MediaCard);

export { _MediaCard as MediaCard };
export default _MediaCard;

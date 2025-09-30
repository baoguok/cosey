import { withInstall } from '../utils';
import ImageCard from './image-card';

export * from './image-card.api';

const _ImageCard = withInstall(ImageCard);

export { _ImageCard as ImageCard };
export default _ImageCard;

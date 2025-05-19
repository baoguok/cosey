import { withInstall } from '../utils';
import ImageCard from './image-card.vue';

export * from './image-card';

const _ImageCard = withInstall(ImageCard);

export { _ImageCard as ImageCard };
export default _ImageCard;

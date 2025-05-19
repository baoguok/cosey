import { withInstall } from '../utils';
import AudioCard from './audio-card.vue';

export * from './audio-card';

const _AudioCard = withInstall(AudioCard);

export { _AudioCard as AudioCard };
export default _AudioCard;

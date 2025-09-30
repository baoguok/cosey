import { withInstall } from '../utils';
import AudioCard from './audio-card';

export * from './audio-card.api';

const _AudioCard = withInstall(AudioCard);

export { _AudioCard as AudioCard };
export default _AudioCard;

import { withInstall } from '../utils';
import FileCard from './file-card.vue';

export * from './file-card';

const _FileCard = withInstall(FileCard);

export { _FileCard as FileCard };
export default _FileCard;

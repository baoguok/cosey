import { withInstall } from '../utils';
import FileCard from './file-card';

export * from './file-card.api';

const _FileCard = withInstall(FileCard);

export { _FileCard as FileCard };
export default _FileCard;

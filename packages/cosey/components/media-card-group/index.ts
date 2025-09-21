import { withInstall } from '../utils';
import MediaCardGroup from './media-card-group';

export * from './media-card-group.api';

const _MediaCardGroup = withInstall(MediaCardGroup);

export { _MediaCardGroup as MediaCardGroup };
export default _MediaCardGroup;

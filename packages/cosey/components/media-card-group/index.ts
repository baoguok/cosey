import { withInstall } from '../utils';
import MediaCardGroup from './media-card-group.vue';

export * from './media-card-group';

const _MediaCardGroup = withInstall(MediaCardGroup);

export { _MediaCardGroup as MediaCardGroup };
export default _MediaCardGroup;

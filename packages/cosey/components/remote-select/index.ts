import { withInstall } from '../utils';
import RemoteSelect from './remote-select.vue';

export * from './remote-select';

const _RemoteSelect = withInstall(RemoteSelect);

export { _RemoteSelect as RemoteSelect };
export default _RemoteSelect;

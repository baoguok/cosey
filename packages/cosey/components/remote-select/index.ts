import { withInstall } from '../utils';
import RemoteSelect from './remote-select';

export * from './remote-select.api';

const _RemoteSelect = withInstall(RemoteSelect);

export { _RemoteSelect as RemoteSelect };
export default _RemoteSelect;

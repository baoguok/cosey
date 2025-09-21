import { withInstall } from '../utils';
import Panel from './panel';

export * from './panel.api';

const _Panel = withInstall(Panel);

export { _Panel as Panel };
export default _Panel;

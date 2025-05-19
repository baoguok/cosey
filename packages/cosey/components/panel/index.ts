import { withInstall } from '../utils';
import Panel from './panel.vue';

export * from './panel';

const _Panel = withInstall(Panel);

export { _Panel as Panel };
export default _Panel;

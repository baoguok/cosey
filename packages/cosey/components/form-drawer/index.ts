import { withInstall } from '../utils';
import FormDrawer from './form-drawer.vue';

export * from './form-drawer';

const _FormDrawer = withInstall(FormDrawer);

export { _FormDrawer as FormDrawer };
export default _FormDrawer;

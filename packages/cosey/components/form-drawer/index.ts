import { withInstall } from '../utils';
import FormDrawer from './form-drawer';

export * from './form-drawer.api';

const _FormDrawer = withInstall(FormDrawer);

export { _FormDrawer as FormDrawer };
export default _FormDrawer;

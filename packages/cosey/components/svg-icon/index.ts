import { withInstall } from '../utils';
import SvgIcon from './svg-icon.vue';

export * from './svg-icon';

const _SvgIcon = withInstall(SvgIcon);

export { _SvgIcon as SvgIcon };
export default _SvgIcon;

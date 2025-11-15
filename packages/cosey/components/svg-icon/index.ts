import { withInstall } from '../utils';
import SvgIcon from './svg-icon';

export * from './svg-icon.api';

const _SvgIcon = withInstall(SvgIcon);

export { _SvgIcon as SvgIcon };
export default _SvgIcon;

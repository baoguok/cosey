import { withInstall } from '../utils';
import ConfigProvider from './config-provider';

export * from './config-provider.api';

const _ConfigProvider = withInstall(ConfigProvider);

export { _ConfigProvider as ConfigProvider };
export default _ConfigProvider;

import { withInstall } from '../utils';
import ConfigProvider from './config-provider.vue';

export * from './config-provider';

const _ConfigProvider = withInstall(ConfigProvider);

export { _ConfigProvider as ConfigProvider };
export default _ConfigProvider;

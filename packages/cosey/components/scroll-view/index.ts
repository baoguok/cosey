import { withInstall } from '../utils';
import ScrollView from './scroll-view.vue';

export * from './scroll-view';

const _ScrollView = withInstall(ScrollView);

export { _ScrollView as ScrollView };
export default _ScrollView;

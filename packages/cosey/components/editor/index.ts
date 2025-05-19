import { defineAsyncComponent, defineComponent, h } from 'vue';
import { withInstall } from '../utils';
import { useMounted } from '../../hooks';
import { isClient } from '../../utils';

export * from './editor';

const Editor = defineComponent({
  name: 'Editor',
  setup(props, { slots }) {
    const AsyncComponent = defineAsyncComponent(() => import('./editor.vue'));

    const isMounted = useMounted();

    return () => {
      if (!isClient()) {
        return isMounted.value && h(AsyncComponent, props, slots);
      }

      return h(AsyncComponent, props, slots);
    };
  },
}) as unknown as (typeof import('./editor.vue'))['default'];

if (isClient()) {
  import('./editor.vue');
}

const _Editor = withInstall(Editor);

export { _Editor as Editor };
export default _Editor;

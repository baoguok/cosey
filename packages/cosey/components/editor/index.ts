import { defineAsyncComponent, defineComponent, h } from 'vue';
import { withInstall } from '../utils';
import { useMounted } from '../../hooks';
import { isClient } from '../../utils';

export * from './editor.api';

const Editor = defineComponent({
  name: 'Editor',
  setup(props, { slots }) {
    const AsyncComponent = defineAsyncComponent(() => import('./editor'));

    const isMounted = useMounted();

    return () => {
      if (!isClient()) {
        return isMounted.value && h(AsyncComponent, props, slots);
      }

      return h(AsyncComponent, props, slots);
    };
  },
}) as unknown as (typeof import('./editor'))['default'];

if (isClient()) {
  import('./editor');
}

const _Editor = withInstall(Editor);

export { _Editor as Editor };
export default _Editor;

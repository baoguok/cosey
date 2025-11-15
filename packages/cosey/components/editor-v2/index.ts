import { defineAsyncComponent, defineComponent, h } from 'vue';
import { withInstall } from '../utils';

export * from './editor-v2.api';

const Editor = defineComponent({
  name: 'EditorV2',
  setup(props, { slots }) {
    const AsyncComponent = defineAsyncComponent(() => import('./editor-v2'));

    return () => {
      return h(AsyncComponent, props, slots);
    };
  },
}) as unknown as (typeof import('./editor-v2'))['default'];

const _EditorV2 = withInstall(Editor);

export { _EditorV2 as EditorV2 };
export default _EditorV2;

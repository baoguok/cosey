import { defineComponent, inject, onMounted, useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon/icon.vue';
import { pickerContextKey } from './picker.api';

export default defineComponent({
  props: {
    width: { type: String },
  },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { slots, emit }) {
    const { prefixCls } = useComponentConfig('editor-v2-button');

    const buttonRef = useTemplateRef('button');

    const pickerContext = inject(pickerContextKey, null);

    onMounted(() => {
      if (pickerContext) {
        pickerContext.triggerTarget.value = buttonRef.value as HTMLElement;
      }
    });

    return () => {
      return (
        <button
          ref="button"
          type="button"
          class={[prefixCls.value, `${prefixCls.value}-select`]}
          style={{ width: props.width }}
          onMousedown={(event) => event.preventDefault()}
          onClick={(event) => emit('click', event)}
        >
          <div class={[`${prefixCls.value}-text`]}>{slots.default?.()}</div>
          <Icon class={`${prefixCls.value}-arrow`} name="co:chevron-down" size="lg" />
        </button>
      );
    };
  },
});

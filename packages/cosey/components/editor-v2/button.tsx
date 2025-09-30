import { defineComponent, useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';

export interface EditorButtonExpose {
  el?: HTMLButtonElement;
}

export default defineComponent({
  props: { active: { type: Boolean } },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { slots, emit, expose }) {
    const { prefixCls } = useComponentConfig('editor-button');

    const buttonRef = useTemplateRef('button');

    expose({
      el: buttonRef,
    });

    return () => {
      return (
        <button
          ref="button"
          type="button"
          class={[
            prefixCls.value,
            {
              'is-active': props.active,
            },
          ]}
          onClick={(event) => emit('click', event)}
          onMousedown={(event) => event.preventDefault()}
        >
          {slots.default?.()}
        </button>
      );
    };
  },
});

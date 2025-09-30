import { defineComponent, inject, onMounted, useTemplateRef } from 'vue';
import { useComponentConfig } from '../config-provider';
import Icon from '../icon/icon.vue';
import { pickerContextKey } from './picker.api';
import Button, { type EditorButtonExpose } from './button';

export default defineComponent({
  props: {
    chevronActive: { type: Boolean },
    active: { type: Boolean },
  },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
    'chevron-click': (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { slots, emit }) {
    const { prefixCls } = useComponentConfig('editor-button');

    const onBtnClick = (event: MouseEvent) => {
      emit('click', event);
    };

    const onChevronClick = (event: MouseEvent) => {
      emit('chevron-click', event);
    };

    const chevronButtonRef = useTemplateRef<EditorButtonExpose>('chevronButton');

    const pickerContext = inject(pickerContextKey, null);

    onMounted(() => {
      if (pickerContext) {
        pickerContext.triggerTarget.value = chevronButtonRef.value!.el as HTMLElement;
      }
    });

    return () => {
      return (
        <div
          class={[
            `${prefixCls.value}-split`,
            {
              'is-active': props.chevronActive,
            },
          ]}
        >
          <Button active={props.active} {...{ onClick: onBtnClick }}>
            {slots.default?.()}
          </Button>
          <Button
            ref="chevronButton"
            active={props.chevronActive}
            class={`${prefixCls.value}-chevron`}
            onClick={onChevronClick}
          >
            <Icon class={`${prefixCls.value}-arrow`} name="co:chevron-down" size="lg" />
          </Button>
        </div>
      );
    };
  },
});

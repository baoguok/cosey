import { computed, defineComponent, ref, watch } from 'vue';
import { formGroupEmits, formGroupProps, formGroupSlots } from './form-group.api';
import { reactiveOmit } from '@vueuse/core';
import Icon from '../icon/icon.vue';
import useStyle from './form-group.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoFormGroup',
  props: formGroupProps,
  slots: formGroupSlots,
  emits: formGroupEmits,
  setup(props, { slots, emit }) {
    const { prefixCls } = useComponentConfig('form-group', props);

    const { hashId } = useStyle(prefixCls);

    const spaceProps = reactiveOmit(props, [
      'title',
      'borderStyle',
      'position',
      'collapsible',
      'collapsed',
    ]);

    const innerCollapsed = ref(false);

    const isBordered = computed(() => !!props.title);

    watch(
      () => props.collapsed,
      () => {
        innerCollapsed.value = !!props.collapsed;
      },
      {
        immediate: true,
      },
    );

    const handleToggle = () => {
      if (props.collapsible) {
        innerCollapsed.value = !innerCollapsed.value;
        emit('update:collapsed', innerCollapsed.value);
      }
    };

    return () => {
      return (
        <div
          class={[
            hashId.value,
            prefixCls.value,
            { 'is-bordered': isBordered.value, 'is-collapsed': innerCollapsed.value },
          ]}
          style={{
            borderStyle: isBordered.value ? props.borderStyle : undefined,
          }}
        >
          {props.title && (
            <div class={[`${prefixCls.value}-title`, `is-${props.position}`]}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: props.collapsible ? 'pointer' : '',
                }}
                onClick={handleToggle}
              >
                {props.collapsible && (
                  <Icon name={innerCollapsed.value ? 'co:caret-up' : 'co:caret-down'} size="xl" />
                )}
                {props.title}
              </div>
            </div>
          )}

          <el-space
            v-show={!innerCollapsed.value}
            {...spaceProps}
            style={{ display: 'flex', minWidth: 0 }}
          >
            {slots.default?.({})}
          </el-space>
        </div>
      );
    };
  },
});

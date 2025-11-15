import { computed, defineComponent, ref, watch } from 'vue';
import { SvgIcon } from '../svg-icon';
import { IconifyIcon } from '../iconify-icon';
import { iconProps } from './icon.api';
import useStyle from './icon.style';
import { useComponentConfig } from '../config-provider';

export default defineComponent({
  name: 'CoIcon',
  inheritAttrs: false,
  props: iconProps,
  setup(props, { slots, attrs }) {
    const { prefixCls } = useComponentConfig('icon', props);

    const { hashId } = useStyle(prefixCls);

    const prefix = ref();
    const name = ref('');

    watch(
      () => props.name,
      () => {
        if (props.name) {
          const result = /^(?:([^:]+):)?([^:]+)$/.exec(props.name);
          if (result) {
            prefix.value = result[1];
            name.value = result[2];
          }
        }
      },
      {
        immediate: true,
      },
    );

    const styles = computed(() => {
      const size = Number.isNaN(Number(props.size)) ? props.size : props.size + 'px';
      return {
        fontSize: size,
      };
    });

    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    const sizeClass = computed(() => {
      return sizes.includes(props.size as any) ? `${prefixCls.value}-${props.size}` : '';
    });

    const mergedProps = computed(() => {
      return {
        name: name.value,
        class: [hashId.value, prefixCls.value, sizeClass.value],
        style: styles.value,
      } as any;
    });

    return () => {
      return (
        <>
          {slots.default ? (
            <span {...attrs} {...mergedProps.value}>
              <slot></slot>
            </span>
          ) : prefix.value === 'svg' ? (
            <SvgIcon {...attrs} {...mergedProps.value} />
          ) : (
            <IconifyIcon {...attrs} {...mergedProps.value} prefix={prefix.value} />
          )}
        </>
      );
    };
  },
});

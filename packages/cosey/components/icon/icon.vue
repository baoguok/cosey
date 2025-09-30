<template>
  <span v-if="$slots.default" v-bind="mergedProps"><slot></slot></span>
  <SvgIcon v-else-if="prefix === 'svg'" v-bind="mergedProps" />
  <IconifyIcon v-else v-bind="mergedProps" :prefix="prefix" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SvgIcon } from '../svg-icon';
import { IconifyIcon } from '../iconify-icon';
import { type IconProps } from './icon';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'CoIcon',
});

const props = withDefaults(defineProps<IconProps>(), {});

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
</script>

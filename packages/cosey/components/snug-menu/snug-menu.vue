<template>
  <div :class="[hashId, prefixCls, `is-${mode}`]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref, toRef, watch } from 'vue';
import {
  type SnugMenuProps,
  type SnugMenuSlots,
  type SnugMenuEmits,
  type SnugMenuContext,
  snugMenuContextSymbol,
} from './snug-menu';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'CoSnugMenu',
});

const props = withDefaults(defineProps<SnugMenuProps>(), {
  mode: 'vertical',
});

defineSlots<SnugMenuSlots>();

const emit = defineEmits<SnugMenuEmits>();

const { prefixCls } = useComponentConfig('snug-menu', props);

const { hashId } = useStyle(prefixCls);

const activeName = ref<string>();

watch(
  () => props.modelValue,
  () => {
    activeName.value = props.modelValue;
  },
  {
    immediate: true,
  },
);

const select = (name: string) => {
  emit('update:modelValue', name);
  emit('change', name);
};

provide<SnugMenuContext>(
  snugMenuContextSymbol,
  reactive({
    activeName,
    select,
    mode: toRef(() => props.mode),
  }),
);
</script>

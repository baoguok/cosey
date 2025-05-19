<template>
  <el-button type="primary" link @click="handleClick">
    {{ text }}
    <Icon :name="innerValue ? 'co:chevron-down' : 'co:chevron-up'" size="xl" />
  </el-button>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { ElButton } from 'element-plus';
import { type ToggleProps, type ToggleSlots, type ToggleEmits } from './toggle';
import Icon from '../icon/icon.vue';

defineOptions({
  name: 'Toggle',
});

const props = defineProps<ToggleProps>();

defineSlots<ToggleSlots>();

const emit = defineEmits<ToggleEmits>();

const innerValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue;
  },
);

const text = computed(() => {
  return innerValue.value ? '展开' : '收起';
});

const handleClick = () => {
  innerValue.value = !innerValue.value;
  emit('update:modelValue', innerValue.value);
};
</script>

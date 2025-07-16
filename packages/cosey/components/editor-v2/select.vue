<template>
  <Picker v-model:visible="visible" max-height="300px">
    <ButtonSelect :width="buttonWidth" @click="onClick">
      {{ displayedLabel }}
    </ButtonSelect>
    <template #content>
      <List :list="list" :selected-value="modelValue" @select="onSelect" />
    </template>
  </Picker>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Picker from './picker/picker.vue';
import ButtonSelect from './button-select.vue';
import List from './list/list.vue';
import { type ListItem } from './list/list';

const props = defineProps<{
  list: ListItem[];
  modelValue?: any;
  buttonWidth?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
}>();

const visible = ref(false);

const displayedLabel = computed(() => {
  return props.list.find((item) => item.value === props.modelValue)?.label || props.modelValue;
});

const onSelect = (item: ListItem) => {
  emit('update:modelValue', item.value);
  emit('change', item.value);
  visible.value = false;
};

const onClick = () => {
  visible.value = !visible.value;
};
</script>

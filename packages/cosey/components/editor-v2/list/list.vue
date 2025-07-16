<template>
  <div :class="[hashId, prefixCls]">
    <div
      v-for="item in list"
      :key="item.value"
      :class="[
        `${prefixCls}-item`,
        {
          'is-active': selectedValue === item.value,
        },
      ]"
      :style="item.style"
      @click="onSelect(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useComponentConfig } from '../../config-provider';
import useStyle from './list.style';
import { ListItem } from './list';

defineProps<{
  selectedValue?: any;
  list: ListItem[];
}>();

const emit = defineEmits<{
  (e: 'select', item: ListItem): void;
}>();

const { prefixCls } = useComponentConfig('editor-list');
const { hashId } = useStyle(prefixCls);

const onSelect = (item: ListItem) => {
  emit('select', item);
};
</script>

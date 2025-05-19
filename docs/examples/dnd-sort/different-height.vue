<template>
  <co-dnd-sort tag="div" class="flex flex-col gap-4" @move="onMove">
    <co-dnd-sort-item
      v-for="(item, i) in listData"
      :key="item.value"
      :index="i"
      class="px-2"
      :style="{
        height: item.height,
        border: '1px solid var(--el-border-color)',
      }"
    >
      {{ item.label }}
    </co-dnd-sort-item>
  </co-dnd-sort>
</template>

<script lang="ts" setup>
import { arrayMove } from 'cosey/utils';
import { ref } from 'vue';

const listData = ref(
  Array(4)
    .fill(0)
    .map((_, i) => {
      return {
        height: (i + 1) * 30 + 'px',
        label: 'label' + i,
        value: 'value' + i,
      };
    }),
);

const onMove = (fromIndex: number, toIndex: number) => {
  arrayMove(listData.value, fromIndex, toIndex);
};
</script>

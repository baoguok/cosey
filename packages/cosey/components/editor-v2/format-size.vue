<template>
  <Select v-model="current" :list="list" button-width="100px" @change="onChange" />
  <FontSizeDelta :delta="-1" icon="co:text-minus" @change="onDeltaChange" />
  <FontSizeDelta :delta="+1" icon="co:text-plus" @change="onDeltaChange" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from 'slate-vue3';
import Select from './select.vue';
import FontSizeDelta from './format-size-delta.vue';
import { useMarkValue } from './hooks/useMarkValue';

const sizes = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '32px',
  '40px',
  '48px',
  '56px',
  '64px',
  '72px',
];

const list = computed(() => {
  const sizeList = sizes.map((size) => {
    return {
      label: size,
      value: size,
    };
  });
  return [
    {
      label: '默认字号',
      value: '',
    },
    ...sizeList,
  ];
});

const editor = useEditor();

const current = useMarkValue('size');

const onChange = (value: string) => {
  editor.formatSize(value);
};

const onDeltaChange = (value: string) => {
  current.value = value;
};
</script>

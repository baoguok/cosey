<template>
  <Select v-model="current" :list="list" button-width="100px" @change="onChange"></Select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from 'slate-vue3';
import { useToken } from '../theme';
import Select from './select.vue';
import { useBlockList } from './hooks/useBlockList';
import { HEADING_TYPES, HEADING_WITH_PARA_TYPES, type HeadingType } from './plugins/heading';

const { token } = useToken();

const list = computed(() => {
  const headingList = HEADING_TYPES.map((item, i) => {
    const n = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    return {
      label: `标题 ${n}`,
      value: item,
      style: {
        fontSize: token.value[`fontSizeHeading${n}`] + 'px',
        lineHeight: token.value[`lineHeightHeading${n}`],
        fontWeight: token.value['fontWeightStrong'],
      },
    };
  });

  return [
    {
      label: '正文',
      value: 'paragraph',
      style: {
        lineHeight: token.value['lineHeight'],
        fontSize: token.value['fontSize'] + 'px',
      },
    },
    ...headingList,
  ];
});

const editor = useEditor();

const current = useBlockList(HEADING_WITH_PARA_TYPES as unknown as string[], 'paragraph');

const onChange = (value: HeadingType) => {
  editor.formatHeading(value);
};
</script>

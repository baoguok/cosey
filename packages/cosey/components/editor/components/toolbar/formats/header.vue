<template>
  <Select v-model="value" :list="list" button-width="100px" @change="onChange"></Select>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import Select from '../../select.vue';
import { useToken } from '../../../../theme';
import { Toolbar } from '../toolbar';
import { toolbarContextKey } from '../toolbarContext';

const { token } = useToken();

const { toolbar } = inject(toolbarContextKey)!;

const headings = [1, 2, 3, 4, 5, 6] as const;

type HeaderValue = typeof headings | false;

const list = computed(() => {
  const headingList = headings.map((heading) => {
    return {
      label: `标题 ${heading}`,
      value: heading,
      style: {
        fontSize: token.value[`fontSizeHeading${heading}`] + 'px',
        lineHeight: token.value[`lineHeightHeading${heading}`],
        fontWeight: token.value['fontWeightStrong'],
      },
    };
  });

  return [
    {
      label: '正文',
      value: false,
      style: {
        lineHeight: token.value['lineHeight'],
        fontSize: token.value['fontSize'] + 'px',
      },
    },
    ...headingList,
  ];
});

const value = ref<HeaderValue>(false);

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        value.value = (formats['header'] as HeaderValue) || false;
      });
    }
  },
  {
    immediate: true,
  },
);

const onChange = (value: any) => {
  toolbar.value!.header(value);
};
</script>

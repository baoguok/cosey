<template>
  <Select v-model="value" :list="list" button-width="150px" @change="onChange"></Select>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import Select from '../../select.vue';
import { Toolbar } from '../toolbar';
import { toolbarContextKey } from '../toolbarContext';
import { fonts } from '../../../formats/font';
import { useLocale } from '../../../../../hooks';

const { t } = useLocale();

const { toolbar } = inject(toolbarContextKey)!;

const list = computed(() => {
  const sizeList = fonts.map(([label, value]) => {
    return {
      label,
      value,
      style: {
        fontFamily: value,
      },
    };
  });
  return [
    {
      label: t('co.editor.defaultFont'),
      value: false,
    },
    ...sizeList,
  ];
});

const value = ref<string | false | null>(false);

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        const fontFormats = formats['font'];
        value.value = Array.isArray(fontFormats) ? null : (fontFormats as string) || false;
      });
    }
  },
  {
    immediate: true,
  },
);

const onChange = (value: any) => {
  toolbar.value!.font(value);
};
</script>

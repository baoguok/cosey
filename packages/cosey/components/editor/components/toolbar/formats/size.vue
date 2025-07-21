<template>
  <Select v-model="value" :list="list" button-width="100px" @change="onChange"></Select>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import Select from '../../select.vue';
import { Toolbar } from '../toolbar';
import { toolbarContextKey } from '../toolbarContext';
import { useLocale } from '../../../../../hooks';

const { t } = useLocale();

const { toolbar } = inject(toolbarContextKey)!;

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
      label: t('co.editor.defaultFontSize'),
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
        const sizeFormats = formats['size'];
        value.value = Array.isArray(sizeFormats) ? null : (sizeFormats as string) || false;
      });
    }
  },
  {
    immediate: true,
  },
);

const onChange = (value: any) => {
  toolbar.value!.size(value);
};
</script>

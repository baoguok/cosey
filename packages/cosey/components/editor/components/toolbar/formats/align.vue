<template>
  <Button :active="isActive" @click="toolbar?.align(align, isActive)">
    <Icon :name="mapIcons[align]" />
  </Button>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { Toolbar } from '../toolbar';

const props = defineProps<{
  align: 'left' | 'center' | 'right' | 'justify';
}>();

const { toolbar } = inject(toolbarContextKey)!;

const isActive = ref(false);

const mapIcons = {
  left: 'co:text-align-left',
  center: 'co:text-align-center',
  right: 'co:text-align-right',
  justify: 'co:text-align-justify',
};

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        isActive.value = formats['align'] === props.align;
      });
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Button :active="isActive" @click="toolbar?.bold(!isActive)">
    <Icon name="co:text-bold" />
  </Button>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { Toolbar } from '../toolbar';

const { toolbar } = inject(toolbarContextKey)!;

const isActive = ref(false);

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        isActive.value = formats['bold'] != null;
      });
    }
  },
  {
    immediate: true,
  },
);
</script>

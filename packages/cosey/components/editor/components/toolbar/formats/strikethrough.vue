<template>
  <Button :active="isActive" @click="toolbar?.strike(!isActive)">
    <Icon name="bi:type-strikethrough" />
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
        isActive.value = formats['strike'] != null;
      });
    }
  },
  {
    immediate: true,
  },
);
</script>

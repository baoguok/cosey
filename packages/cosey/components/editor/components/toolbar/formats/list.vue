<template>
  <Button :active="isActive" @click="toolbar?.list(type)">
    <Icon :name="mapIcons[type]" />
  </Button>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { Toolbar } from '../toolbar';

const props = defineProps<{
  type: 'ordered' | 'bullet';
}>();

const mapIcons = {
  ordered: 'co:list-numbered',
  bullet: 'co:list-bulleted',
};

const { toolbar } = inject(toolbarContextKey)!;

const isActive = ref(false);

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        isActive.value = formats['list'] === props.type;
      });
    }
  },
  {
    immediate: true,
  },
);
</script>

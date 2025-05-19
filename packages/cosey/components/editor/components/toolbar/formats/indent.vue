<template>
  <Button @click="toolbar?.indent(type)">
    <Icon :name="mapIcons[type]" />
  </Button>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';

defineProps<{
  type: '-1' | '+1';
}>();

const mapIcons = {
  '-1': 'co:text-indent-less',
  '+1': 'co:text-indent-more',
};

const { toolbar } = inject(toolbarContextKey)!;
</script>

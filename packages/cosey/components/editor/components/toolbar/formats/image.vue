<template>
  <Button @click="toolbar?.image()">
    <Icon name="co:image" />
  </Button>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';

const { toolbar } = inject(toolbarContextKey)!;
</script>

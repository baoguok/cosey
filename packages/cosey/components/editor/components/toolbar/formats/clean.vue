<template>
  <Button @click="toolbar?.clean()">
    <Icon name="co:text-clear-format" />
  </Button>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';

const { toolbar } = inject(toolbarContextKey)!;
</script>

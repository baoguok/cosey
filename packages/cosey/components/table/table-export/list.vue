<template>
  <div :class="`${prefixCls}-list`">
    <Item v-for="(node, i) in nodeList" :node="node" :key="i" />
  </div>
</template>

<script lang="ts" setup>
import { type TableColumnProps } from '../table-column/table-column.api';
import Item from './item.vue';
import { useComponentConfig } from '../../config-provider';
import { type CheckableNode } from '../../../hooks';

defineProps<{
  nodeList: CheckableNode<TableColumnProps>[] | undefined;
}>();

const { prefixCls } = useComponentConfig('table-export');
</script>

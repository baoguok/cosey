<template>
  <div>
    <div :class="`${prefixCls}-list-item`">
      <el-checkbox
        :label="column.label"
        :model-value="node.checkedStatus === 'checked'"
        :indeterminate="node.checkedStatus === 'indeterminate'"
        @change="onCheckChange($event, node)"
      />
    </div>
    <List v-if="node.children && node.children.length" :node-list="node.children" />
  </div>
</template>

<script lang="ts" setup>
import { type TableColumnProps } from '../table-column/table-column.api';
import List from './list.vue';
import { useComponentConfig } from '../../config-provider';
import { useTreeCheckInject, type CheckableNode } from '../../../hooks';
import { computed } from 'vue';

const props = defineProps<{
  node: CheckableNode<TableColumnProps>;
}>();

const column = computed(() => props.node.data);

// check
const { onCheckChange } = useTreeCheckInject();

const { prefixCls } = useComponentConfig('table-export');
</script>

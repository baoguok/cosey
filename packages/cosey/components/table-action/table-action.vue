<template>
  <div :class="[hashId, prefixCls]">
    <div v-for="(actions, rowIndex) in dyadicActions" :key="rowIndex" :class="`${prefixCls}-row`">
      <Item v-for="(action, actionIndex) in actions" :key="actionIndex" v-bind="action" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defaultTableActionProps, TableActionProps } from './table-action';
import Item from './item.vue';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { computed } from 'vue';
import { TableActionItem } from './item';

defineOptions({
  name: 'TableAction',
});

const props = withDefaults(defineProps<TableActionProps>(), defaultTableActionProps);

const dyadicActions = computed(() => {
  return (Array.isArray(props.actions[0]) ? props.actions : [props.actions]) as TableActionItem[][];
});

const { prefixCls } = useComponentConfig('table-action', props);

const { hashId } = useStyle(prefixCls);
</script>

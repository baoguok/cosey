<template>
  <div :class="[hashId, prefixCls]">
    <template v-for="(action, _i) in actions" :key="_i">
      <Item v-bind="action" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defaultTableActionProps, TableActionProps } from './table-action';
import Item from './item.vue';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'TableAction',
});

const props = withDefaults(defineProps<TableActionProps>(), defaultTableActionProps);

const { prefixCls } = useComponentConfig('table-action', props);

const { hashId } = useStyle(prefixCls);
</script>

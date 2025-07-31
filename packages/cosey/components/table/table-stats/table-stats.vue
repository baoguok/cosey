<template>
  <component :is="template"></component>
</template>

<script lang="ts" setup>
import { useComponentConfig } from '../..';
import { defineTemplate } from '../../../utils';
import { defaultTableStatsProps, type TableStatisticsProps } from './table-stats';

import useStyle from './table-stats.style';

const props = withDefaults(defineProps<TableStatisticsProps>(), defaultTableStatsProps);

const { prefixCls } = useComponentConfig('table-stats');

const { hashId } = useStyle(prefixCls);

const template = defineTemplate((h) => {
  return h(
    'div',
    {
      class: [hashId.value, prefixCls.value],
    },
    props.columns.map((column) => {
      let value = props.data[column.prop];
      if (column.format) {
        value = column.format(value);
      }

      return h(
        'div',
        {
          class: `${prefixCls.value}-column`,
        },
        [
          h(
            'div',
            {
              class: `${prefixCls.value}-label`,
            },
            column.label,
          ),
          h(
            'span',
            {
              class: `${prefixCls.value}-colon`,
            },
            ':',
          ),
          h(
            'div',
            {
              class: `${prefixCls.value}-value`,
            },
            value,
          ),
        ],
      );
    }),
  );
});
</script>

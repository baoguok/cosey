<template>
  <el-tooltip placement="top" :show-after="200">
    <div :class="[hashId, prefixCls]" :style="textStyle">
      <template v-if="text">
        {{ text }}
      </template>
      <slot v-else></slot>
    </div>
    <template #content>
      <div :class="[hashId, `${prefixCls}-tooltip`]">
        <el-scrollbar
          :class="`${prefixCls}-scrollbar`"
          :max-height="maxHeight"
          :style="{ maxWidth: addPxUnit(maxWidth) }"
          always
        >
          <template v-if="text">
            {{ text }}
          </template>
          <slot v-else></slot>
        </el-scrollbar>
        <Copy :text="text" color="inherit" :class="`${prefixCls}-copy`" />
      </div>
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LongTextProps, type LongTextSlots, defaultLongTextProps } from './long-text';
import { addPxUnit } from '../../utils';
import Copy from '../copy';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'LongText',
});

const props = withDefaults(defineProps<LongTextProps>(), defaultLongTextProps);

defineSlots<LongTextSlots>();

const { prefixCls } = useComponentConfig('long-text');

const { hashId } = useStyle(prefixCls);

const textStyle = computed(() => {
  return {
    '-webkit-line-clamp': props.rows,
  };
});
</script>

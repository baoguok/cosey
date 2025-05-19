<template>
  <div
    ref="item"
    :class="[
      prefixCls,
      {
        'is-disabled': disabled,
        'is-hover': hover,
      },
    ]"
  >
    <div v-if="withIcon" :class="`${prefixCls}-icon`">
      <Icon v-if="icon" :name="icon" />
    </div>
    <span :class="`${prefixCls}-title`">{{ title }}</span>
    <div :class="`${prefixCls}-arrow`">
      <Icon v-if="arrow" name="co:chevron-right" :class="`${prefixCls}-arrow-icon`" size="lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../icon/icon.vue';
import { useComponentConfig } from '../config-provider';
import { type ContextMenuContentProps } from './content';

const props = defineProps<ContextMenuContentProps>();

const { prefixCls } = useComponentConfig('context-menu-content', props);
</script>

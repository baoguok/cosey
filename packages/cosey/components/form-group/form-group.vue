<template>
  <div
    :class="[hashId, prefixCls, { 'is-bordered': isBordered, 'is-collapsed': innerCollapsed }]"
    :style="{
      borderStyle: isBordered ? props.borderStyle : undefined,
    }"
  >
    <div v-if="title" :class="[`${prefixCls}-title`, `is-${position}`]">
      <div
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: collapsible ? 'pointer' : '',
        }"
        @click="handleToggle"
      >
        <Icon
          v-if="collapsible"
          :name="innerCollapsed ? 'co:caret-up' : 'co:caret-down'"
          size="xl"
        />
        {{ title }}
      </div>
    </div>

    <el-space
      v-show="!innerCollapsed"
      v-bind="spaceProps"
      :style="{ display: 'flex', minWidth: 0 }"
    >
      <slot></slot>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { type FormGroupEmits, type FormGroupProps, type FormGroupSlots } from './form-group';
import { reactiveOmit } from '@vueuse/core';
import Icon from '../icon/icon.vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'CoFormGroup',
});

const props = withDefaults(defineProps<FormGroupProps>(), {
  alignment: 'flex-start',
  size: () => [32, 0],
  wrap: true,
  position: 'left',
});

const emit = defineEmits<FormGroupEmits>();

const { prefixCls } = useComponentConfig('form-group', props);

const { hashId } = useStyle(prefixCls);

const spaceProps = reactiveOmit(props, [
  'title',
  'borderStyle',
  'position',
  'collapsible',
  'collapsed',
]);

const innerCollapsed = ref(false);

const isBordered = computed(() => !!props.title);

watch(
  () => props.collapsed,
  () => {
    innerCollapsed.value = !!props.collapsed;
  },
  {
    immediate: true,
  },
);

const handleToggle = () => {
  if (props.collapsible) {
    innerCollapsed.value = !innerCollapsed.value;
    emit('update:collapsed', innerCollapsed.value);
  }
};

defineSlots<FormGroupSlots>();
</script>

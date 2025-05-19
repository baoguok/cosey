<template>
  <div>
    <el-divider v-if="title" v-bind="dividerProps">
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
    </el-divider>

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
import { reactiveOmit, reactivePick } from '@vueuse/core';
import { type DividerProps } from 'element-plus';
import { omitUndefined } from '../../utils';
import Icon from '../icon/icon.vue';

defineOptions({
  name: 'FormGroup',
});

const props = withDefaults(defineProps<FormGroupProps>(), {
  alignment: 'flex-start',
  size: () => [32, 0],
  wrap: true,
});

const emit = defineEmits<FormGroupEmits>();

const dividerPropsKeys = ['direction', 'borderStyle', 'contentPosition'] as (keyof DividerProps)[];

const dividerProps = computed(() => {
  return {
    contentPosition: 'left',
    ...omitUndefined(reactivePick(props, dividerPropsKeys)),
  } as Partial<DividerProps>;
});

const spaceProps = reactiveOmit(props, dividerPropsKeys, ['title', 'collapsible', 'collapsed']);

const innerCollapsed = ref(false);

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

<template>
  <div
    :class="[
      prefixCls,
      {
        'is-disabled': disabled,
        'is-active': isActive,
      },
      `is-${context.mode}`,
    ]"
    @click="onClick"
  >
    <Icon v-if="icon" :name="icon" size="xl" :class="[`${prefixCls}-icon`]" />
    <div :class="[`${prefixCls}-title`]">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import {
  type SnugMenuItemEmits,
  type SnugMenuItemProps,
  type SnugMenuItemSlots,
} from './snug-menu-item';
import { type SnugMenuContext, snugMenuContextSymbol } from './snug-menu';
import Icon from '../icon/icon.vue';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'CoSnugMenuItem',
});

const props = defineProps<SnugMenuItemProps>();

defineSlots<SnugMenuItemSlots>();

const emit = defineEmits<SnugMenuItemEmits>();

const { prefixCls } = useComponentConfig('snug-menu-item', props);

const context = inject<SnugMenuContext>(snugMenuContextSymbol)!;

const isActive = computed(() => !!props.name && context.activeName === props.name);

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
    context.select(props.name);
  }
};
</script>

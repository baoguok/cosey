<template>
  <template v-if="mergedVisible">
    <el-popconfirm v-if="popconfirm" v-bind="popconfirm">
      <template #reference>
        <el-button v-bind="omit(buttonProps, 'popconfirm')" style="margin: 0">
          <Icon v-if="icon" :name="icon" :style="{ marginInlineEnd: token.marginXXS + 'px' }" />
          {{ label }}
        </el-button>
      </template>
      <template #actions="{ confirm, cancel }">
        <el-button size="small" @click="(event) => onCancel(event, cancel)">
          {{ t('co.common.no') }}
        </el-button>
        <el-button
          type="danger"
          size="small"
          :loading="loading"
          @click="(event) => onConfirm(event, confirm)"
        >
          {{ t('co.common.yes') }}
        </el-button>
      </template>
    </el-popconfirm>
    <el-button v-else v-bind="buttonProps" style="margin: 0">
      <Icon v-if="icon" :name="icon" :style="{ marginInlineEnd: token.marginXXS + 'px' }" />
      {{ label }}
    </el-button>
  </template>
</template>

<script setup lang="ts">
import { omit } from 'lodash-es';
import { ElButton } from 'element-plus';
import { tableActionItemProps } from './item';
import { computed, ref } from 'vue';
import Icon from '../icon/icon.vue';
import { useToken } from '../theme';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'TableActionItem',
  inheritAttrs: false,
});

const props = defineProps(tableActionItemProps);

const { t } = useLocale();

const { token } = useToken();

const buttonProps = computed(() => {
  return omit(props, 'icon');
});

const loading = ref(false);

const mergedVisible = computed(() => {
  return props.hidden ? false : props.visible;
});

const onConfirm = async (e: MouseEvent, confirm: (e: MouseEvent) => void) => {
  loading.value = true;
  try {
    await props.popconfirm?.confirm?.(e);
    confirm(e);
  } catch {
    void 0;
  } finally {
    loading.value = false;
  }
};

const onCancel = (e: MouseEvent, cancel: (e: MouseEvent) => void) => {
  cancel(e);
};
</script>

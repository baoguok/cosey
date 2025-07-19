<template>
  <div :class="`${prefixCls}-item`">
    <MediaCard
      :src="file.previewUrl"
      :name="file.name"
      :type="file.type"
      :size="size"
      :title="mergedTitle"
      ref="media"
    />
    <transition name="co-fade">
      <div
        v-if="file.status === 'loading' || file.status === 'error'"
        :class="`${prefixCls}-status`"
      >
        <el-progress
          :percentage="file.percent"
          type="circle"
          :width="64"
          :status="getProgressStatus(file.status)"
          v-slot="{ percentage }"
        >
          <Icon v-if="file.status === 'error'" name="co:close-filled" size="lg" />
          <span :class="`${prefixCls}-progress-text`" v-else>
            {{ progressFormat(percentage) }}
          </span>
        </el-progress>
        <div :class="`${prefixCls}-actions`">
          <el-button
            v-if="file.status === 'loading'"
            link
            size="small"
            type="primary"
            @click="emit('cancel')"
          >
            {{ t('co.upload.cancelUpload') }}
          </el-button>
          <el-button
            v-if="file.status === 'error'"
            link
            size="small"
            type="primary"
            :style="{ marginInlineStart: 0 }"
            @click="emit('re-upload')"
          >
            {{ t('co.upload.reUpload') }}
          </el-button>
          <el-button
            link
            size="small"
            type="primary"
            :style="{ marginInlineStart: 0 }"
            @click="emit('remove')"
          >
            {{ t('co.common.delete') }}
          </el-button>
        </div>
      </div>
    </transition>
    <div v-if="showRemove" type="danger" :class="`${prefixCls}-remove`" @click="emit('remove')">
      <Icon name="co:close-large" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type UploadItemEmits, type UploadFileStatus, type UploadItemProps } from './upload';
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import { isString } from '../../utils';
import { MediaCard } from '../media-card';
import Icon from '../icon/icon.vue';
import { useLocale } from '../../hooks';

import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'UploadItem',
});

const props = defineProps<UploadItemProps>();

const emit = defineEmits<UploadItemEmits>();

const { prefixCls } = useComponentConfig('upload');

const { t } = useLocale();

const progressStatus = {
  success: 'success',
  error: 'exception',
} as const;

const getProgressStatus = (status: UploadFileStatus) => {
  return progressStatus[status as keyof typeof progressStatus];
};

const progressFormat = (percentage: number) => {
  return Math.floor(percentage) + '%';
};

const showRemove = computed(
  () => !props.readonly && (props.file.status === 'unready' || props.file.status === 'success'),
);

const mergedTitle = computed(() => (isString(props.file.url) ? props.file.url : ''));
</script>

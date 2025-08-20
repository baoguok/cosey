<template>
  <div :class="[hashId, prefixCls]">
    <InternalTransitionGroup effect="fade">
      <UploadItem
        v-for="file in fileList"
        :key="file.key"
        :file="file"
        :readonly="readonly"
        :size="size"
        @remove="onRemove(file)"
        @re-upload="onReUpload(file)"
        @cancel="onCancel(file)"
      />
      <div v-if="showSelect" :class="[`${prefixCls}-select`, `is-${size}`]" @click="onSelect">
        <Icon name="co:add-large" size="24" />
      </div>
    </InternalTransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, toRaw, watch } from 'vue';
import {
  type UploadProps,
  type UploadSlots,
  type UploadEmits,
  type UploadFile,
  defaultUploadProps,
} from './upload';
import { CHANGE_EVENT, ElMessage, useFormItem } from 'element-plus';
import { debugWarn } from 'element-plus/es/utils/error.mjs';
import { chooseFiles, getFileType, isShallowEqual, uuid, isString, getBasename } from '../../utils';
import UploadItem from './upload-item.vue';
import { TransitionGroup as InternalTransitionGroup } from '../transition-group';
import Icon from '../icon/icon.vue';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { useUpload } from '../upload-context';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'Upload',
});

const props = withDefaults(defineProps<UploadProps>(), defaultUploadProps);

defineSlots<UploadSlots>();

const emit = defineEmits<UploadEmits>();

const { t } = useLocale();

const { prefixCls } = useComponentConfig('upload');

const { hashId } = useStyle(prefixCls);

const { request } = useUpload() || {};

const mergedLimit = computed(() => (props.single ? 1 : props.limit));

const mergedMultiple = computed(() => (props.single ? false : props.multiple));

const fileList = ref<UploadFile[]>([]);

const showSelect = computed(
  () =>
    !props.readonly &&
    !props.disabled &&
    (!mergedLimit.value || fileList.value.length < mergedLimit.value),
);

let innerValue: UploadProps['modelValue'];

const { formItem } = useFormItem();

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate?.(CHANGE_EVENT).catch((err) => debugWarn(err));
    }
  },
);

watch(
  () => props.modelValue,
  (newValue) => {
    // 内部变动
    if (innerValue === toRaw(newValue)) {
      return;
    }

    innerValue = toRaw(newValue);

    const urls = Array.isArray(newValue) ? newValue : newValue ? [newValue] : [];

    fileList.value = urls.map((item): UploadFile => {
      return reactive({
        raw: null,
        name: isString(item) ? getBasename(item) : '',
        type: getFileType(item) || 'image',
        size: 0,
        url: item,
        previewUrl: item instanceof File ? URL.createObjectURL(item) : item,
        key: uuid(),
        percent: 0,
        status: 'unready',
        controller: null,
      });
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  fileList.value.forEach((item) => {
    if (isString(item.previewUrl) && item.previewUrl.indexOf('blob:') === 0) {
      URL.revokeObjectURL(item.previewUrl);
    }
  });
});

const onSelect = async () => {
  const files = await chooseFiles({
    multiple: mergedMultiple.value,
    accept: props.accept,
  });

  if (mergedLimit.value && fileList.value.length + files.length > mergedLimit.value) {
    emit('exceed');
    ElMessage.warning(
      t('co.upload.maxUpload', {
        num: mergedLimit.value,
      }),
    );
    return;
  }

  files.forEach((rawFile) => {
    const file: UploadFile = reactive({
      raw: rawFile,
      name: rawFile.name,
      type: getFileType(rawFile),
      size: rawFile.size,
      url: '',
      previewUrl: URL.createObjectURL(rawFile),
      key: uuid(),
      status: 'ready',
      percent: 0,
      controller: null,
    });
    fileList.value.push(file);

    if (props.selectOnly) {
      file.percent = 100;
      file.url = rawFile;
      file.status = 'success';
      nextTick(() => {
        syncProp();
      });
    } else {
      upload(file);
    }
  });
};

const upload = (file: UploadFile) => {
  file.controller = new AbortController();

  const options = {
    signal: file.controller.signal,
    data: file.raw!,
    onProgress: (percent: number) => {
      file.percent = percent;
    },
    onSuccess: (url: string) => {
      file.url = url;
      file.status = 'success';
      nextTick(() => {
        syncProp();
      });
    },
    onError: () => {
      file.status = 'error';
    },
  };

  file.status = 'loading';

  return doUpload(options);
};

const doUpload = async (options: {
  signal: AbortSignal;
  data: File;
  onProgress: (percent: number) => void;
  onSuccess: (url: string) => void;
  onError: () => void;
}) => {
  return (props.request || request)?.(
    options.data,
    {
      ...props.requestConfig,
      signal: options.signal,
      onUploadProgress(event) {
        if (event.total) {
          options.onProgress((event.loaded / event.total) * 100);
        }
        props.requestConfig?.onUploadProgress?.(event);
      },
    },
    props.requestExtra,
  )
    .then((url) => {
      options.onSuccess(url);
    })
    .catch(() => {
      options.onError();
    });
};

const syncProp = () => {
  const urls = fileList.value.map((file) => {
    return file.url;
  });
  const nextValue = props.single ? urls[0] : urls;

  if (
    innerValue === nextValue ||
    (Array.isArray(nextValue) && Array.isArray(innerValue) && isShallowEqual(nextValue, innerValue))
  ) {
    return;
  }

  innerValue = nextValue;
  emit('update:modelValue', nextValue);
  emit('change', nextValue);
};

const onCancel = (file: UploadFile) => {
  file.controller?.abort();
  file.status = 'error';
};

const onReUpload = (file: UploadFile) => {
  file.percent = 0;
  upload(file);
};

const onRemove = (file: UploadFile) => {
  if (file.status === 'loading') {
    onCancel(file);
  }
  fileList.value.splice(fileList.value.indexOf(file), 1);
  syncProp();
};
</script>

<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import { computed, mergeProps, ref } from 'vue';
import {
  type ImageCardEmits,
  imageProps,
  type ImageCardSlots,
  ImageCardExpose,
} from './image-card';
import { ElImage, useLockscreen } from 'element-plus';
import { defineTemplate } from '../../utils';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'ImageCard',
});

const props = defineProps(imageProps);

defineEmits<ImageCardEmits>();

const slots = defineSlots<ImageCardSlots>();

const { prefixCls } = useComponentConfig('image-card', props);

const { hashId } = useStyle(prefixCls);

const imageRef = ref();

const mergedPreviewSrcList = computed(() => {
  return props.srcList?.length
    ? props.srcList
    : props.previewSrcList?.length
      ? props.previewSrcList
      : props.src
        ? [props.src]
        : [];
});

defineExpose<ImageCardExpose>({
  view() {
    imageRef.value?.$el.querySelector('img').click();
  },
});

const viewerVisible = ref(false);

const onShow = () => {
  viewerVisible.value = true;
};

const onClose = () => {
  viewerVisible.value = false;
};

// 修复 ElImage 显隐页面晃动缺陷
useLockscreen(viewerVisible);

const mergedProps = computed(() => {
  return mergeProps(props, {
    title: props.title || props.src,
    class: [hashId.value, prefixCls.value, `is-${props.size}`],
    previewSrcList: mergedPreviewSrcList.value,
    previewTeleported: true,
    onShow,
    onClose,
    ref: imageRef,
    initialIndex: Math.max(mergedPreviewSrcList.value.indexOf(props.src!), 0),
  });
});

const template = defineTemplate(() => {
  return <ElImage {...mergedProps.value} v-slots={slots}></ElImage>;
});
</script>

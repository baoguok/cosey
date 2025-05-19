<template>
  <div
    :class="[
      hashId,
      prefixCls,
      {
        'is-error': formItem?.validateState === 'error',
      },
    ]"
  >
    <Toolbar />
    <div
      ref="element"
      :class="`${prefixCls}-container`"
      :style="{
        height,
        minHeight,
        maxHeight,
      }"
    ></div>
    <Resize />
    <TableToolbar />
  </div>
</template>

<script lang="ts" setup>
import Quill from 'quill';
import { onMounted, provide, ref, shallowRef, useTemplateRef, watch } from 'vue';
import { debugWarn } from 'element-plus/es/utils/error.mjs';
import { CHANGE_EVENT, useFormItem } from 'element-plus';
import { defaultEditorProps, type EditorEmits, type EditorProps } from './editor';

import useStyle from './style';
import useHljsStyle from './style/hljs';
import useImageLoadingStyle from './modules/image-uploader/formats/image-loading.style';

import { useComponentConfig } from '../config-provider';

import { syntaxOptions } from './modules/syntax';

import { editorContextKey } from './quillContext';
import { useUpload } from '../upload';

import Resize from './components/resize/resize.vue';
import Toolbar from './components/toolbar/toolbar.vue';
import TableToolbar from './components/table-toolbar/table-toolbar.vue';

import { register } from './quill';

defineOptions({
  name: 'Editor',
  inheritAttrs: false,
});

register();

const props = withDefaults(defineProps<EditorProps>(), defaultEditorProps);

const emit = defineEmits<EditorEmits>();

const { prefixCls } = useComponentConfig('editor', props);

const { hashId } = useStyle(prefixCls);

useHljsStyle();

// quill

useImageLoadingStyle();

const { request } = useUpload() || {};

const element = useTemplateRef('element');

const quill = shallowRef<any>();

provide(editorContextKey, { quill });

const createQuill = () => {
  return new Quill(element.value!, {
    modules: {
      syntax: syntaxOptions,
      uploader: false,
      table: true,
      imageUploader: {
        upload: (file: File) => {
          return (props.request || request)?.(file);
        },
      },
      customList: true,
    },
    placeholder: props.placeholder,
  });
};

// form

const innerValue = ref(props.modelValue);

const { formItem } = useFormItem();

const setEditorValue = (value = '') => {
  quill.value?.clipboard.dangerouslyPasteHTML(value);
};

const initEditor = () => {
  quill.value = createQuill();

  if (innerValue.value) {
    setEditorValue(innerValue.value);
  }

  quill.value.on('text-change', () => {
    let value = quill.value!.getSemanticHTML();
    if (value === '<p></p>') {
      value = '';
    }
    if (value !== innerValue.value) {
      innerValue.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    }
  });
};

watch(
  () => props.modelValue,
  (value) => {
    if (value !== innerValue.value) {
      innerValue.value = value;
      setEditorValue(value);
    }
    if (props.validateEvent) {
      formItem?.validate?.(CHANGE_EVENT).catch((err) => debugWarn(err));
    }
  },
);

onMounted(() => {
  initEditor();
});
</script>

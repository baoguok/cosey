import Quill from 'quill';
import { defineComponent, onMounted, provide, ref, shallowRef, useTemplateRef, watch } from 'vue';
import { debugWarn } from 'element-plus/es/utils/error.mjs';
import { CHANGE_EVENT, useFormItem } from 'element-plus';
import { editorEmits, editorProps } from './editor.api';

import useStyle, { useHljsStyle } from './editor.style';
import useImageLoadingStyle from './modules/image-uploader/formats/image-loading.style';

import { useComponentConfig } from '../config-provider';

import { syntaxOptions } from './modules/syntax';

import { editorContextKey } from './quillContext';
import { useUpload } from '../upload';

import Resize from './components/resize/resize.vue';
import Toolbar from './components/toolbar/toolbar.vue';
import TableToolbar from './components/table-toolbar/table-toolbar.vue';

import { register } from './quill';

export default defineComponent({
  name: 'CoEditor',
  inheritAttrs: false,
  props: editorProps,
  emits: editorEmits,
  setup(props, { emit }) {
    register();

    const { prefixCls } = useComponentConfig('editor', props);

    const { hashId } = useStyle(prefixCls);

    useHljsStyle();

    // quill

    useImageLoadingStyle();

    const { request } = useUpload() || {};

    const element = useTemplateRef<HTMLElement>('element');

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

    return () => {
      return (
        <div
          class={[
            hashId.value,
            prefixCls.value,
            {
              'is-error': formItem?.validateState === 'error',
            },
          ]}
        >
          <Toolbar />
          <div
            ref="element"
            class={`${prefixCls.value}-container`}
            style={{
              height: props.height,
            }}
          ></div>
          <Resize />
          <TableToolbar />
        </div>
      );
    };
  },
});

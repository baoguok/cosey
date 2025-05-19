<template>
  <Button @click="onBtnClick">
    <Icon name="co:video-player" />
  </Button>

  <FormDialog v-model="visible" :title="title" width="sm">
    <Form :model="formModel" label-width="auto" grid :row-props="{ gutter: 16 }" :submit="onSubmit">
      <FormItem v-model="formModel.url" prop="url" label="URL" field-type="input" />
      <FormItem
        v-model="formModel.width"
        prop="width"
        label="宽度"
        field-type="input"
        :col-props="{ span: 12 }"
      />
      <FormItem
        v-model="formModel.height"
        prop="height"
        label="高度"
        field-type="input"
        :col-props="{ span: 12 }"
      />
    </Form>
  </FormDialog>
</template>

<script lang="ts" setup>
import { computed, inject, reactive, ref } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { FormDialog } from '../../../../form-dialog';
import { Form, FormItem } from '../../../../form';
import Quill from 'quill';

const { quill } = inject(toolbarContextKey)!;

// form
const visible = ref(false);

let currentTarget: HTMLVideoElement | null = null;

const actionType = ref<'update' | 'insert'>('insert');

const title = computed(() => `${actionType.value === 'update' ? '编辑' : '插入'}视频`);

const formModel = reactive({
  url: '',
  width: '300',
  height: '150',
});

const onBtnClick = () => {
  const range = quill.value!.getSelection(true);
  const [blot] = quill.value!.getLeaf(range.index - 1);
  if (blot && blot.domNode instanceof Element && blot.domNode.tagName === 'VIDEO') {
    const el = (currentTarget = blot.domNode as HTMLVideoElement);
    Object.assign(formModel, {
      url: el.getAttribute('src'),
      width: el.getAttribute('width'),
      height: el.getAttribute('height'),
    });
    actionType.value = 'update';
  } else {
    currentTarget = null;
    actionType.value = 'insert';
  }

  visible.value = true;
};

const onSubmit = () => {
  if (!formModel.url) {
    return;
  }

  if (actionType.value === 'insert') {
    const value = {
      url: formModel.url,
      width: formModel.width,
      height: formModel.height,
    };

    const range = quill.value!.getSelection(true);

    quill.value!.insertEmbed(range.index + range.length, 'video', value, Quill.sources.USER);
  } else if (currentTarget) {
    currentTarget.setAttribute('src', formModel.url);
    currentTarget.setAttribute('width', formModel.width);
    currentTarget.setAttribute('height', formModel.height);
  }
};
</script>

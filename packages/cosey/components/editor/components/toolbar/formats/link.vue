<template>
  <Button :active="isActive" @click="onBtnClick">
    <Icon name="co:link" />
  </Button>

  <FormDialog v-model="visible" :title="title" width="sm">
    <Form :model="formModel" label-width="auto" :submit="onSubmit">
      <FormItem v-model="formModel.url" prop="url" label="URL" field-type="input" />
      <FormItem
        v-model="formModel.text"
        prop="text"
        :label="t('co.editor.displayedText')"
        field-type="input"
      />
      <FormItem
        v-model="formModel.title"
        prop="title"
        :label="t('co.editor.leading')"
        field-type="input"
      />
      <FormItem
        v-model="formModel.target"
        prop="target"
        :label="t('co.editor.openLinkAt')"
        field-type="select"
        :field-props="{
          options: targetOptions,
        }"
      />
    </Form>
  </FormDialog>

  <ContextMenu ref="contextMenu" @command="onCommand">
    <ContextMenuItem icon="co:link" :title="title" command="upsert" />
    <template v-if="actionType === 'update'">
      <ContextMenuItem icon="co:unlink" :title="t('co.editor.removeLink')" command="remove" />
      <ContextMenuItem icon="co:launch" :title="t('co.editor.openLink')" command="open" />
    </template>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { computed, inject, reactive, ref, useTemplateRef, watch } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { Toolbar } from '../toolbar';
import { FormDialog } from '../../../../form-dialog';
import { Form, FormItem } from '../../../../form';
import { ContextMenu, ContextMenuItem } from '../../../../context-menu';
import Quill, { Range } from 'quill';
import { Link } from '../../../formats/link';
import { useLocale } from '../../../../../hooks';

const { t } = useLocale();

const { quill, toolbar } = inject(toolbarContextKey)!;

const isActive = ref(false);

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        isActive.value = formats['link'] != null;
      });
    }
  },
  {
    immediate: true,
  },
);

let tempLink: HTMLLinkElement | null = null;
let linkRange: Range;

watch(
  quill,
  (quill) => {
    if (quill) {
      quill.root.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        getSelectedInfo();
        contextMenuRef.value?.open(event.clientX, event.clientY);
      });
    }
  },
  { immediate: true },
);

// form
const contextMenuRef = useTemplateRef('contextMenu');

const visible = ref(false);

const actionType = ref<'update' | 'insert'>('insert');

const title = computed(
  () =>
    `${actionType.value === 'update' ? t('co.editor.edit') : t('co.editor.insert')}${t('co.editor.link')}`,
);

const formModel = reactive({
  url: '',
  text: '',
  title: '',
  target: '',
});

const targetOptions = [
  { label: t('co.editor.currentWindow'), value: '_self' },
  { label: t('co.editor.newWindow'), value: '_blank' },
];

const getSelectedInfo = () => {
  const range = quill.value!.getSelection(true);
  const [link, offset] = quill.value!.scroll.descendant(Link, range.index);

  if (link) {
    linkRange = new Range(range.index - offset, link.length());
    tempLink = link.domNode as HTMLLinkElement;
    actionType.value = 'update';
  } else {
    linkRange = range;
    tempLink = null;
    actionType.value = 'insert';
  }
};

const upsert = () => {
  switch (actionType.value) {
    case 'update':
      Object.assign(formModel, {
        url: tempLink!.href,
        text: tempLink!.innerText,
        title: tempLink!.title,
        target: tempLink!.getAttribute('target') || '_self',
      });
      break;
    case 'insert': {
      const range = quill.value!.getSelection(true);
      const text = quill.value!.getText(range);
      Object.assign(formModel, {
        url: '',
        text,
        title: '',
        target: '_self',
      });
      break;
    }
  }
  visible.value = true;
};

const onBtnClick = () => {
  getSelectedInfo();
  upsert();
};

const onCommand = (command: any) => {
  switch (command) {
    case 'upsert':
      upsert();
      break;
    case 'remove':
      if (linkRange) {
        quill.value!.formatText(linkRange, 'link', false, Quill.sources.USER);
      }
      break;
    case 'open':
      if (tempLink) {
        window.open(tempLink.href, '_blank');
      }
      break;
  }
};

const onSubmit = () => {
  if (!formModel.url) {
    return;
  }
  const value = {
    href: formModel.url,
    title: formModel.title,
    target: formModel.target === '_self' ? '' : formModel.target,
  };

  quill.value!.deleteText(linkRange, Quill.sources.USER);
  quill.value!.insertText(linkRange.index, formModel.text, 'link', value, Quill.sources.USER);
};
</script>

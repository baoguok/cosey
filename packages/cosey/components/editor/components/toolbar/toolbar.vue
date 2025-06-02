<template>
  <div :class="prefixCls">
    <ButtonGroup>
      <FormatsHeader />
      <FormatsFont />
      <FormatsSize />
      <FormatsSizeDelta type="+1" />
      <FormatsSizeDelta type="-1" />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsBold />
      <FormatsItalic />
      <FormatsUnderline />
      <FormatsStrike />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsScript type="super" />
      <FormatsScript type="sub" />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsColor />
      <FormatsBackground />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsList type="bullet" />
      <FormatsList type="ordered" />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsIndent type="-1" />
      <FormatsIndent type="+1" />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsAlign align="left" />
      <FormatsAlign align="center" />
      <FormatsAlign align="right" />
      <FormatsAlign align="justify" />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsBlockquote />
      <FormatsCodeBlock />
      <FormatsCode />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsLink />
      <FormatsImage />
      <FormatsVideo />
      <FormatsTable />
      <FormatsFormula />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsClean />
    </ButtonGroup>
    <ButtonGroup>
      <FormatsSource />
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, shallowRef, watch } from 'vue';
import { useComponentConfig } from '../../../config-provider';
import { editorContextKey } from '../../quillContext';
import { toolbarContextKey } from './toolbarContext';
import { Toolbar } from './toolbar';

import ButtonGroup from '../button-group.vue';

import FormatsHeader from './formats/header.vue';
import FormatsFont from './formats/font.vue';
import FormatsSize from './formats/size.vue';
import FormatsSizeDelta from './formats/size-delta.vue';
import FormatsBold from './formats/bold.vue';
import FormatsItalic from './formats/italic.vue';
import FormatsUnderline from './formats/underline.vue';
import FormatsStrike from './formats/strike.vue';
import FormatsScript from './formats/script.vue';
import FormatsColor from './formats/color.vue';
import FormatsBackground from './formats/background.vue';
import FormatsList from './formats/list.vue';
import FormatsIndent from './formats/indent.vue';
import FormatsAlign from './formats/align.vue';
import FormatsBlockquote from './formats/blockquote.vue';
import FormatsCodeBlock from './formats/code-block.vue';
import FormatsCode from './formats/code.vue';
import FormatsLink from './formats/link.vue';
import FormatsImage from './formats/image.vue';
import FormatsVideo from './formats/video.vue';
import FormatsTable from './formats/table.vue';
import FormatsFormula from './formats/formula.vue';
import FormatsClean from './formats/clean.vue';
import FormatsSource from './formats/source.vue';

defineProps<{}>();

const { prefixCls } = useComponentConfig('editor-toolbar');

const { quill } = inject(editorContextKey)!;

const toolbar = shallowRef<Toolbar>();

provide(toolbarContextKey, {
  toolbar,
  quill,
});

watch(
  quill,
  () => {
    if (quill.value) {
      toolbar.value = new Toolbar(quill.value);
    }
  },
  {
    immediate: true,
  },
);
</script>

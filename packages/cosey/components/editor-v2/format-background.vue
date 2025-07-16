<template>
  <ColorPicker v-model:visible="visible" @select="onSelect" @clear="onClear">
    <ButtonSplit :chevron-active="visible" @click="onBtnClick" @chevron-click="onChevronClick">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <g fill-rule="evenodd">
          <path d="M3 18h18v3H3z" :fill="current"></path>
          <path
            fill-rule="nonzero"
            fill="currentColor"
            d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6"
          ></path>
        </g>
      </svg>
    </ButtonSplit>
  </ColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonSplit from './button-split.vue';
import ColorPicker from './color-picker/color-picker.vue';
import { useEditor } from 'slate-vue3';
const editor = useEditor();

const visible = ref(false);

const current = ref('#000');

const select = (color?: string) => {
  editor.formatBackground(color);
};

const onChevronClick = () => {
  visible.value = !visible.value;
};

const onBtnClick = () => {
  select(current.value);
};

const onSelect = (color: string) => {
  current.value = color;
  select(color);
};

const onClear = () => {
  select();
};
</script>

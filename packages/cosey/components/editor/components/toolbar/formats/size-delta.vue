<template>
  <Button @click="onClick">
    <Icon :name="mapIcons[type]" />
  </Button>
</template>

<script lang="ts" setup>
import { inject, watch } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import { Toolbar } from '../toolbar';
import Button from '../../button.vue';
import Icon from '../../../../icon';
import { getStyle } from '../../../../../utils';

const props = defineProps<{
  type: '-1' | '+1';
}>();

const mapIcons = {
  '-1': 'co:text-minus',
  '+1': 'co:text-plus',
};

const { toolbar } = inject(toolbarContextKey)!;

let value: number | null = null;

watch(
  toolbar,
  (toolbar) => {
    if (toolbar) {
      toolbar.on(Toolbar.events.EDITOR_CHANGE, (event) => {
        const formats = event.detail.formats;
        const sizeFormats = formats['size'];
        const range = toolbar.quill.getSelection();
        if (range && range.length > 0) {
          let size = 0;
          if (sizeFormats) {
            size = parseInt(Array.isArray(sizeFormats) ? sizeFormats[0] : sizeFormats);
          } else {
            const blot = toolbar.quill.getLeaf(range.index)[0];
            if (blot) {
              const el = blot.domNode.parentElement;
              if (el) {
                size = parseInt(getStyle(el, 'fontSize') as string);
              }
            }
          }
          value = size;
        } else {
          value = null;
        }
      });
    }
  },
  {
    immediate: true,
  },
);

const onClick = () => {
  if (value) {
    value += props.type === '+1' ? 1 : -1;
    if (value < 1) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }
    toolbar.value!.size(value + 'px');
  }
};
</script>

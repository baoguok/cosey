<template>
  <div ref="floatingRef" :class="[hashId, prefixCls]" :style="floatingStyle">
    <ButtonGroup>
      <Button @click="table.insertRowAbove()">
        <Icon name="co:table-row-plus-before" />
      </Button>
      <Button @click="table.insertRowBelow()">
        <Icon name="co:table-row-plus-after" />
      </Button>
      <Button @click="table.deleteRow()">
        <Icon name="co:table-row-remove" />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button @click="table.insertColumnLeft()">
        <Icon name="co:table-column-plus-before" />
      </Button>
      <Button @click="table.insertColumnRight()">
        <Icon name="co:table-column-plus-after" />
      </Button>
      <Button @click="table.deleteColumn()">
        <Icon name="co:table-column-remove" />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button @click="table.deleteTable()">
        <Icon name="co:table-remove" />
      </Button>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, useTemplateRef, watch } from 'vue';
import { flip, offset, shift } from '@floating-ui/dom';
import { useFloating } from '../../../../hooks';
import useStyle from './table-toolbar.style';
import { useComponentConfig } from '../../../config-provider';
import { Icon } from '../../../icon';
import Button from '../button.vue';
import ButtonGroup from '../button-group.vue';
import { editorContextKey } from '../../quillContext';
import Quill from 'quill';
import { TableCell, TableContainer } from 'quill/formats/table';
import Table from 'quill/modules/table';

const { prefixCls } = useComponentConfig('editor-table-toolbar');
const { hashId } = useStyle(prefixCls);

const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = useTemplateRef('floatingRef');

const { x, y, floating } = useFloating(referenceEl, floatingEl, {
  placement: 'top',
  strategy: 'absolute',
  middleware: [offset(0), flip(), shift()],
});

watch(
  referenceEl,
  () => {
    floating.value = !!referenceEl.value;
  },
  {
    immediate: true,
  },
);

const floatingStyle = computed(() => {
  return {
    display: floating.value ? 'flex' : 'none',
    top: y.value + 'px',
    left: x.value + 'px',
  };
});

const { quill } = inject(editorContextKey)!;

watch(
  quill,
  (quill) => {
    if (quill) {
      quill.on(Quill.events.EDITOR_CHANGE, () => {
        const range = quill.getSelection();
        if (range) {
          const [cell] = quill.getLine(range.index);
          if (cell && cell.statics.blotName === TableCell.blotName) {
            const row = cell.parent;
            const table = row.parent.parent;

            referenceEl.value = table.domNode;
          } else {
            referenceEl.value = null;
          }
        } else {
          referenceEl.value = null;
        }
      });
    }
  },
  {
    immediate: true,
  },
);

const table = {
  getTable() {
    return quill.value!.getModule('table') as Table;
  },

  insertRowAbove() {
    this.getTable().insertRowAbove();
  },

  insertRowBelow() {
    this.getTable().insertRowBelow();
  },

  deleteRow() {
    this.getTable().deleteRow();
  },

  insertColumnLeft() {
    this.getTable().insertColumnLeft();
  },

  insertColumnRight() {
    this.getTable().insertColumnRight();
  },

  deleteColumn() {
    this.getTable().deleteColumn();
  },

  deleteTable() {
    this.getTable().deleteTable();
  },

  setTopHeader() {
    const table = this.getTable().getTable()[0] as unknown as TableContainer;
    table.domNode.classList.toggle('ql-table-top-header');
  },

  setLeftHeader() {
    const table = this.getTable().getTable()[0] as unknown as TableContainer;
    table.domNode.classList.toggle('ql-table-left-header');
  },
};
</script>

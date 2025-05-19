<template>
  <Picker
    :popper-class="[hashId, prefixCls]"
    v-model:visible="visible"
    :trigger-target="triggerTarget"
    nopadding
  >
    <Button ref="button" @click="onBtnClick">
      <Icon name="co:table" />
    </Button>

    <template #content>
      <div :class="`${prefixCls}-grid`">
        <div v-for="row in count" :key="row" :class="`${prefixCls}-row`">
          <div
            v-for="col in count"
            :key="col"
            :class="[
              `${prefixCls}-cell`,
              {
                'is-selected': col <= grid.col && row <= grid.row,
              },
            ]"
            @pointerover="onCellPointerOver(row, col)"
            @click="onCellClick(row, col)"
          ></div>
        </div>
      </div>
      <div :class="`${prefixCls}-count`">
        {{ `${grid.col}x${grid.row}` }}
      </div>
    </template>
  </Picker>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref, shallowRef, useTemplateRef } from 'vue';
import { toolbarContextKey } from '../toolbarContext';
import Picker from '../../picker/picker.vue';
import Button from '../../button.vue';
import { Icon } from '../../../../icon';
import { useComponentConfig } from '../../../../config-provider';
import useStyle from './table.style';
import Table from 'quill/modules/table';

const { prefixCls } = useComponentConfig('editor-table');
const { hashId } = useStyle(prefixCls);

const { toolbar } = inject(toolbarContextKey)!;

const count = 10;

const visible = ref(false);

const buttonRef = useTemplateRef('button');

const triggerTarget = shallowRef<HTMLElement | null>();

const grid = reactive({
  row: 0,
  col: 0,
});

onMounted(() => {
  triggerTarget.value = buttonRef.value?.el;
});

const onBtnClick = () => {
  if (!visible.value) {
    grid.row = 0;
    grid.col = 0;
  }
  visible.value = !visible.value;
};

const onCellPointerOver = (row: number, col: number) => {
  grid.row = row;
  grid.col = col;
};

const onCellClick = (row: number, col: number) => {
  visible.value = false;

  const table = toolbar.value!.quill.getModule('table') as Table;

  toolbar.value!.quill.focus();

  table.insertTable(row, col);
};
</script>

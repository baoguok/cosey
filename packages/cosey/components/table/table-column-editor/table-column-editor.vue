<template>
  <el-popover
    v-bind="$props"
    v-model:visible="visible"
    virtual-triggering
    placement="bottom"
    :width="240"
    trigger="click"
    popper-style="--el-popover-padding: 0; --el-checkbox-height: auto"
    @before-enter="onBeforeEnter"
  >
    <div ref="wrapper" :class="[hashId, prefixCls]">
      <div :class="`${prefixCls}-header`">
        <el-checkbox
          :model-value="checkAllValue"
          :indeterminate="checkAllIndeterminate"
          @change="onCheckAllChange"
        >
          {{ t('co.common.checkAll') }}
        </el-checkbox>
      </div>
      <el-scrollbar :max-height="maxHeight">
        <div :class="`${prefixCls}-body`">
          <List :node-list="tree" />
        </div>
      </el-scrollbar>
      <div :class="`${prefixCls}-footer`">
        <el-button size="small" link @click="reset">{{ t('co.table.restoreDefault') }}</el-button>
        <div style="margin-inline-start: auto">
          <el-button size="small" link @click="cancel">
            {{ t('co.common.cancel') }}
          </el-button>
          <el-button size="small" link type="primary" @click="confirm">
            {{ t('co.common.confirm') }}
          </el-button>
        </div>
      </div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import {
  type TableColumnEditorEmits,
  type TableColumnEditorProps,
  defaultTableColumnEditorProps,
} from './table-column-editor';
import { nextTick, ref, shallowReactive, useTemplateRef } from 'vue';
import List from './list.vue';

import useStyle from './table-column-editor.style';
import { useComponentConfig } from '../../config-provider';
import { useTreeCheck } from '../../../hooks';
import { type TableColumnProps } from '../table-column/table-column';
import { mapTree, walkTree } from '../../../utils';
import { ElButton } from 'element-plus';
import { useLocale } from '../../../hooks';

defineOptions({
  name: 'CoTableColumnEditor',
});

const props = withDefaults(defineProps<TableColumnEditorProps>(), defaultTableColumnEditorProps);

const emit = defineEmits<TableColumnEditorEmits>();

const { prefixCls } = useComponentConfig('table-column-editor');

const { t } = useLocale();

const { hashId } = useStyle(prefixCls);

const wrapperRef = useTemplateRef('wrapper');

const visible = ref(false);

const maxHeight = ref('');

// check

const {
  tree,
  checkAllValue,
  checkAllIndeterminate,
  onCheckAllChange,
  initialize,
  setCheckedByNode,
} = useTreeCheck<TableColumnProps>({
  childrenKey: 'columns',
  initialChecked: true,
});

const setUncheckedIfHiden = () => {
  walkTree(tree.value, 'children', (node) => {
    const hidden = !!node.data.hidden;
    if (hidden) {
      setCheckedByNode(node, false);
    }
  });
};

const onBeforeEnter = () => {
  initialize(
    mapTree(
      props.modelValue,
      (node) => {
        return shallowReactive({ ...node });
      },
      {
        childrenKey: 'columns',
      },
    ),
  );

  setUncheckedIfHiden();

  nextTick(() => {
    const el = wrapperRef.value;
    if (el) {
      const top = el.getBoundingClientRect().top;
      maxHeight.value = `calc(100vh - ${top}px - 68px - 10px)`;
    }
  });
};

// action
const getUpdatedColumns = () => {
  return mapTree(
    tree.value,
    (node) => {
      return {
        ...node.data,
        hidden: node.checkedStatus === 'unchecked',
      };
    },
    {
      childrenKey: 'children',
      newChildrenKey: 'columns',
    },
  );
};

const confirm = () => {
  emit('update:modelValue', getUpdatedColumns());
  visible.value = false;
};

const cancel = () => {
  visible.value = false;
};

const reset = () => {
  emit('reset');
  visible.value = false;
};
</script>

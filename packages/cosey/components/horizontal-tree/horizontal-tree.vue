<template>
  <div :class="[hashId, prefixCls]">
    <div v-if="tableTree.length === 0" :class="`${prefixCls}-empty`">
      {{ t('co.common.noData') }}
    </div>
    <table v-else>
      <thead v-if="showCheckbox && !checkStrictly">
        <tr>
          <td :colspan="maxLevel">
            <div :class="`${prefixCls}-node`">
              <el-checkbox
                :model-value="checkAllValue"
                :indeterminate="checkAllIndeterminate"
                @change="onCheckAllChange"
              >
                {{ t('co.common.checkAll') }}
              </el-checkbox>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tableTree" :key="i">
          <td
            v-for="(node, j) in row"
            :key="j"
            :colspan="node.reverseLevel === 1 ? maxLevel - node.level + 1 : 1"
            :rowspan="node.leafCount"
          >
            <div v-if="node.reverseLevel !== 1 || !mergeLast" :class="`${prefixCls}-node`">
              <el-checkbox
                v-if="showCheckbox"
                :disabled="getDisabled(node.data)"
                :model-value="node.checkedStatus === 'checked'"
                :indeterminate="node.checkedStatus === 'indeterminate'"
                @change="(value) => onCheckChange(node, !!value)"
              >
                <span :class="getNodeClass(node.data)">
                  <slot name="node">
                    {{ node.data[propNames.label] }}
                  </slot>
                </span>
              </el-checkbox>
              <span v-else :class="getNodeClass(node.data)">
                <slot name="node">
                  {{ node.data[propNames.label] }}
                </slot>
              </span>
            </div>
            <div v-else>
              <div
                v-for="(_node, k) in node.parent!.children"
                :key="k"
                :class="`${prefixCls}-node`"
              >
                <el-checkbox
                  v-if="showCheckbox"
                  :disabled="getDisabled(node.data)"
                  :model-value="_node.checkedStatus === 'checked'"
                  :indeterminate="_node.checkedStatus === 'indeterminate'"
                  @change="(value) => onCheckChange(_node, !!value)"
                >
                  <slot name="node">
                    <span :class="getNodeClass(_node.data)">
                      {{ _node.data[propNames.label] }}
                    </span>
                  </slot>
                </el-checkbox>
                <slot v-else name="node">
                  <span :class="getNodeClass(_node.data)">
                    {{ _node.data[propNames.label] }}
                  </span>
                </slot>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="tsx">
import {
  type HorizontalTreeProps,
  type HorizontalTreeSlots,
  type HorizontalTreeEmits,
  type HorizontalTreeExpose,
} from './horizontal-tree';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { extraTreeToTable, isString, mapTree, walkTree } from '../../utils';
import { computed, watch } from 'vue';
import { type CheckableNode, useTreeCheck } from '../../hooks';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'HorizontalTree',
});

const props = defineProps<HorizontalTreeProps>();

defineSlots<HorizontalTreeSlots>();

const emit = defineEmits<HorizontalTreeEmits>();

const { prefixCls } = useComponentConfig('horizontal-tree', props);

const { hashId } = useStyle(prefixCls);

const { t } = useLocale();

const propNames = computed(() => {
  return Object.assign(
    {
      children: 'children',
      label: 'label',
      disabled: 'disabled',
      class: 'class',
    },
    props.props,
  );
});

const {
  rootNode,
  tree: checkableTree,
  checkAllValue,
  checkAllIndeterminate,
  onCheckAllChange,
  initialize,
  setCheckedByNode,
} = useTreeCheck({
  mergeLast: props.mergeLast,
  childrenKey: propNames.value.children,
  checkStrictly: props.checkStrictly,
});

const tree = computed(() => {
  return mapTree(props.data || [], (node) => node);
});

watch(
  tree,
  () => {
    initialize(tree.value);
  },
  {
    immediate: true,
  },
);

const tableTree = computed(() => {
  return extraTreeToTable(checkableTree.value, props.mergeLast);
});

const maxLevel = computed(() => Math.max(...tableTree.value.map(([item]) => item.reverseLevel)));

const getDisabled = (node: Record<PropertyKey, any>) => {
  return isString(propNames.value.disabled)
    ? node[propNames.value.disabled]
    : node[(propNames.value.disabled as (...args: any[]) => any)(props.data, node)];
};

const getNodeClass = (node: Record<PropertyKey, any>) => {
  return isString(propNames.value.class)
    ? node[propNames.value.class]
    : node[(propNames.value.class as (...args: any[]) => any)(props.data, node)];
};

const onCheckChange = (node: CheckableNode, checked: boolean) => {
  setCheckedByNode(node, checked);
  emit('check-change', node.data, checked);
};

// expose

const getCheckedNodes = () => {
  const nodes: Record<PropertyKey, any>[] = [];

  walkTree(checkableTree.value, 'children', (node) => {
    if (node.checkedStatus === 'checked') {
      nodes.push(node.data);
    }
  });

  return nodes;
};

const setCheckedKeys = (keys: (string | number)[]) => {
  const nodes: CheckableNode[] = [];

  walkTree(checkableTree.value, 'children', (node) => {
    const id = node.data[props.nodeKey!];
    if (keys.includes(id)) {
      nodes.push(node);
    }
  });

  setCheckedByNode(rootNode, false);

  nodes.forEach((node) => {
    setCheckedByNode(node, true);
  });
};

const getCheckedKeys = () => {
  const keys: (string | number)[] = [];

  walkTree(checkableTree.value, 'children', (node) => {
    if (node.checkedStatus === 'checked') {
      const key = node.data[props.nodeKey!];
      keys.push(key);
    }
  });

  return keys;
};

const setCheckedNodes = (nodes: Record<PropertyKey, any>[]) => {
  const keys = nodes.map((node) => node[props.nodeKey!]);
  setCheckedKeys(keys);
};

const setChecked = (key: string | number, checked: boolean) => {
  walkTree(checkableTree.value, 'children', (node) => {
    if (node.data[props.nodeKey!] === key) {
      setCheckedByNode(node, checked);
      return true;
    }
  });
};

const getHalfCheckedNodes = () => {
  const nodes: Record<PropertyKey, any>[] = [];

  walkTree(checkableTree.value, 'children', (node) => {
    if (node.checkedStatus === 'indeterminate') {
      nodes.push(node.data);
    }
  });

  return nodes;
};

const getHalfCheckedKeys = () => {
  const nodes = getHalfCheckedNodes();
  return nodes.map((node) => node[props.nodeKey!]);
};

const getNode = (key: string | number) => {
  let _node: Record<PropertyKey, any> | undefined;
  walkTree(checkableTree.value, 'children', (node) => {
    if (node.data[props.nodeKey!] === key) {
      _node = node.data;
      return true;
    }
  });
  return _node;
};

defineExpose<HorizontalTreeExpose>({
  getCheckedNodes,
  setCheckedNodes,
  setCheckedKeys,
  getCheckedKeys,
  setChecked,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getNode,
});
</script>

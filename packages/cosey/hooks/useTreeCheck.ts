import { ExtraTreeNode, mapTree, mapTreeExtra, walkAncestor, walkTreeNode } from '../utils';
import { type CheckboxValueType } from 'element-plus';
import { computed, inject, InjectionKey, provide, ref, shallowReactive } from 'vue';

export interface TreeCheckContext<INode extends Record<any, any> = Record<any, any>> {
  setCheckedByNode: (node: CheckableNode<INode>, checked: boolean) => void;
}

export const treeCheckContextKey = Symbol('treeCheckContext') as InjectionKey<TreeCheckContext>;

export interface CheckableNode<INode extends Record<PropertyKey, any> = any>
  extends ExtraTreeNode<
    {
      checkedStatus: 'unchecked' | 'indeterminate' | 'checked';
    },
    INode
  > {}

export interface UseTreeCheckOptions {
  childrenKey?: string;
  initialChecked?: boolean;
  mergeLast?: boolean;
  checkStrictly?: boolean;
}

export function useTreeCheck<INode extends Record<any, any>>(options?: UseTreeCheckOptions) {
  const { childrenKey = 'children', initialChecked, mergeLast, checkStrictly } = options || {};

  const initialCheckedStatus = initialChecked ? 'checked' : 'unchecked';

  const tree = ref<CheckableNode<any>[]>([]);

  const rootNode = shallowReactive({
    checkedStatus: initialCheckedStatus,
  }) as CheckableNode<INode>;

  const checkAllValue = computed(() => rootNode.checkedStatus === 'checked');

  const checkAllIndeterminate = computed(() => rootNode.checkedStatus === 'indeterminate');

  const updateAncestorChecked = (node?: CheckableNode<INode>) => {
    walkAncestor(node, 'parent', (node) => {
      const children = node.children || [];
      const length = children.length;

      const mapStatusCount = { unchecked: 0, indeterminate: 0, checked: 0 };

      children.forEach((node) => mapStatusCount[node.checkedStatus]++);

      node.checkedStatus =
        length === mapStatusCount.unchecked
          ? 'unchecked'
          : length === mapStatusCount.checked
            ? 'checked'
            : 'indeterminate';
    });
  };

  const setCheckedByNode = (node: CheckableNode<INode>, checked: boolean) => {
    if (checkStrictly) {
      node.checkedStatus = checked ? 'checked' : 'unchecked';
    } else {
      walkTreeNode(node, 'children', (node) => {
        node.checkedStatus = checked ? 'checked' : 'unchecked';
      });
      updateAncestorChecked(node.parent);
    }
  };

  const onCheckAllChange = (value: CheckboxValueType) => {
    setCheckedByNode(rootNode, !!value);
  };

  const initialize = (rawTree: INode[]) => {
    rootNode.children = tree.value = mapTreeExtra(rawTree, (rawNode) => rawNode, {
      childrenKey,
      parent: rootNode,
      mergeLast,
      customNode(node) {
        return shallowReactive({
          ...node,
          checkedStatus: initialCheckedStatus,
        });
      },
    });
    rootNode.checkedStatus = initialCheckedStatus;
  };

  const getRawTree = () => {
    return mapTree(tree.value, (node) => {
      return node.data!;
    });
  };

  provide(treeCheckContextKey, {
    setCheckedByNode,
  });

  return {
    tree,
    rootNode,
    checkAllValue,
    checkAllIndeterminate,
    onCheckAllChange,
    setCheckedByNode,
    initialize,
    getRawTree,
  };
}

export function useTreeCheckInject<INode extends Record<any, any> = Record<any, any>>() {
  const context = inject(treeCheckContextKey);

  const onCheckChange = (val: CheckboxValueType, node: CheckableNode<INode>) => {
    context?.setCheckedByNode(node, !!val);
  };

  return {
    onCheckChange,
  };
}

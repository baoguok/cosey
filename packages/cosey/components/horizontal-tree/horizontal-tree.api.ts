export interface HorizontalTreeProps<INode extends Record<PropertyKey, any> = any> {
  data?: INode[];
  props?: {
    children?: string;
    label?: string;
    disabled?: string | ((data: INode[], node: INode) => string);
    class?: string | ((data: INode[], node: INode) => string);
  };
  nodeKey?: string;
  nodeWidth?: string;
  mergeLast?: boolean;
  showCheckbox?: boolean;
  checkStrictly?: boolean;
}

export interface HorizontalTreeSlots<INode extends Record<PropertyKey, any> = any> {
  default?: (props: Record<string, never>) => any;
  node?: (node: INode) => any;
}

export interface HorizontalTreeEmits<INode extends Record<PropertyKey, any> = any> {
  (e: 'check-change', node: INode, checked: boolean): void;
}

export interface HorizontalTreeExpose<INode extends Record<PropertyKey, any> = any> {
  getCheckedNodes: () => INode[];
  setCheckedNodes: (nodes: INode[]) => void;
  getCheckedKeys: () => (string | number)[];
  setCheckedKeys: (keys: (string | number)[]) => void;
  setChecked: (key: string | number, checked: boolean) => void;
  getHalfCheckedNodes: () => INode[];
  getHalfCheckedKeys: () => (string | number)[];
  getNode: (key: string | number) => INode | undefined;
}

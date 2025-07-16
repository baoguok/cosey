export interface EditorV2Props {}

export interface EditorV2Slots {
  default?: (props: Record<string, never>) => any;
}

export interface EditorV2Emits {
  (e: 'click'): void;
}

export interface EditorV2Expose {
  method: () => void;
}

import type { ExtractPropTypes, SlotsType } from 'vue';

export const editorV2Props = {};

export type EditorV2Props = ExtractPropTypes<typeof editorV2Props>;

export interface EditorV2Slots {
  default: {};
}

export const editorV2Slots = Object as SlotsType<EditorV2Slots>;

export const editorV2Emits = {};

export type EditorV2Emits = typeof editorV2Emits;

export interface EditorV2Expose {
  method: () => void;
}

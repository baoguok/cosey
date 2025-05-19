import Quill from 'quill';
import { InjectionKey, ShallowRef } from 'vue';

export interface EditorContext {
  quill: ShallowRef<Quill | undefined>;
}

export const editorContextKey = Symbol('editorContext') as InjectionKey<EditorContext>;

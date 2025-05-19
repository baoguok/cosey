import { InjectionKey, ShallowRef } from 'vue';
import Quill from 'quill';
import { Toolbar } from './toolbar';

export interface ToolbarContext {
  toolbar: ShallowRef<Toolbar | undefined>;
  quill: ShallowRef<Quill | undefined>;
}

export const toolbarContextKey = Symbol('toolbarContext') as InjectionKey<ToolbarContext>;

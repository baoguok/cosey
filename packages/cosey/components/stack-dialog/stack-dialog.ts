import { dialogProps, type DialogEmits, type DialogInstance } from 'element-plus';
import {
  EmitFn,
  ExtractPropTypes,
  inject,
  InjectionKey,
  onBeforeUnmount,
  provide,
  reactive,
} from 'vue';
import { type ElDialogSlots } from '../form-dialog';

export const stackDialogProps = {
  ...dialogProps,
};

export type StackDialogProps = ExtractPropTypes<typeof stackDialogProps>;

export interface StackDialogSlots extends ElDialogSlots {}

export interface StackDialogEmits extends /* @vue-ignore */ EmitFn<DialogEmits> {}

export interface StackDialogExpose extends DialogInstance {}

export interface StackDialogInfo {
  transform: string;
}

export function createStackDialogInfo() {
  return reactive<StackDialogInfo>({
    transform: '',
  });
}

export interface StackDialogContext {
  addInfo: (info: StackDialogInfo) => void;
  removeInfo: (info: StackDialogInfo) => void;
}

const stackDialogContextKey = Symbol('stackDialogContext') as InjectionKey<StackDialogContext>;

export function useStackDialogProvide() {
  const infoList: StackDialogInfo[] = [];

  const updateInfo = () => {
    const count = 10;
    const total = 10;

    infoList.forEach((info, index) => {
      const x = Math.min(index / count, 1);
      const t = 1 - Math.pow(1 - x, 4);
      const scale = 1 - (index / infoList.length) * 0.05;
      info.transform = `translateY(${t * total}vh) scale(${scale})`;
    });
  };

  const addInfo = (info: StackDialogInfo) => {
    if (!infoList.includes(info)) {
      infoList.unshift(info);
      updateInfo();
    }
  };
  const removeInfo = (info: StackDialogInfo) => {
    if (infoList.includes(info)) {
      infoList.splice(infoList.indexOf(info), 1);
      updateInfo();
    }
  };

  provide(stackDialogContextKey, {
    addInfo,
    removeInfo,
  });
}

export function useStackDialog() {
  const context = inject(stackDialogContextKey, null);

  const info = createStackDialogInfo();

  const onShow = () => {
    context?.addInfo(info);
  };
  const onHide = () => {
    context?.removeInfo(info);
  };

  onBeforeUnmount(() => {
    context?.removeInfo(info);
  });

  return {
    onShow,
    onHide,
    info,
  };
}

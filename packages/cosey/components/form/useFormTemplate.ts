import { reactiveOmit } from '@vueuse/core';
import {
  type FormExpose,
  type FormContext,
  type FormProps,
  formExposeKeys,
  formContextSymbol,
  formPropsOmit,
} from './form.api';
import { provide, reactive, ref, toRef, useTemplateRef } from 'vue';
import { type FormInstance } from 'element-plus';
import { createMergedExpose } from '../../utils';

export interface UseFormTemplateOptions<T> {
  omittedProps?: (keyof T)[];
}

export function useFormTemplate<T extends FormProps, U extends FormExpose = FormExpose>(
  props: T,
  options: UseFormTemplateOptions<T> = {},
) {
  const elFormProps = reactiveOmit(props, ...formPropsOmit, ...(options.omittedProps || []));

  // 解决 form-list 重置无效
  const resetList: (() => void)[] = [];
  const addResetField = (reset: () => void) => {
    resetList.unshift(reset);
  };
  const removeResetField = (reset: () => void) => {
    resetList.splice(resetList.indexOf(reset), 1);
  };

  provide<FormContext>(
    formContextSymbol,
    reactive({
      colProps: toRef(() => props.colProps),
      grid: toRef(() => props.grid),
      readonly: toRef(() => props.readonly),
      width: toRef(() => props.width),
      addResetField,
      removeResetField,
    }),
  );

  const elFormRef = useTemplateRef<FormInstance>('form');

  const submitting = ref(false);

  const resetFields = () => {
    elFormRef.value?.resetFields();

    resetList.forEach((reset) => {
      reset();
    });
  };

  const reset = () => {
    resetFields();
    props.reset?.();
  };

  const clearValidate = () => {
    elFormRef.value?.clearValidate();
  };

  const submit = async (throwError?: boolean) => {
    if (submitting.value) {
      return;
    }
    submitting.value = true;
    try {
      await elFormRef.value?.validate();
      await props.submit?.();
    } catch (error) {
      if (throwError === true) {
        throw error;
      }
    } finally {
      submitting.value = false;
    }
  };

  const customExpose = {
    submit,
    reset,
  };

  const expose = createMergedExpose<U>(formExposeKeys, () => elFormRef.value, customExpose);

  return {
    elFormProps,
    expose,
    reset,
    resetFields,
    clearValidate,
    submit,
    submitting,
  };
}

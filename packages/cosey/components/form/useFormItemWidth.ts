import { computed, type CSSProperties } from 'vue';
import { type FieldType } from '../field';
import { type FormContext } from './form';
import {
  type FormItemWidth,
  type FormItemPresetWidth,
  type FormItemProps,
  mapFormItemWidth,
} from './form-item';
import { isNumber, isString } from '../../utils';

export function getFormItemWidth(outWidth?: FormItemWidth) {
  let width: string | number | undefined = outWidth;

  if (isNumber(outWidth)) {
    width = outWidth + 'px';
  }

  const presetWidth = mapFormItemWidth[outWidth as FormItemPresetWidth];
  if (isNumber(presetWidth)) {
    width = presetWidth + 'px';
  }

  if (isString(width)) {
    return {
      width,
    };
  }

  return {
    flex: 1,
    minWidth: 0,
  };
}

export function useFormItemWidth<T extends FieldType>(
  props: FormItemProps<T>,
  formContext?: FormContext | null,
) {
  return computed<CSSProperties>(() => {
    const outWidth = props.width ?? formContext?.width;

    return getFormItemWidth(outWidth);
  });
}

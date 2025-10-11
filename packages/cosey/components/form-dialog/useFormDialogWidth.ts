import { computed, Ref } from 'vue';
import {
  type FormDialogWidth,
  type FormDialogPresetWidth,
  mapFormDialogWidth,
} from './form-dialog.api';

export function getFormDialogWidth(outWidth?: FormDialogWidth) {
  return mapFormDialogWidth[outWidth as FormDialogPresetWidth] || outWidth;
}

export function useFormDialogWidth(width: Ref<FormDialogWidth | undefined>) {
  return computed(() => {
    return getFormDialogWidth(width.value);
  });
}

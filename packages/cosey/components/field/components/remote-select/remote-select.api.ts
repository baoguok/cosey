import { fieldComponentCommonProps } from '../common';
import {
  type RemoteSelectSlots,
  type RemoteSelectProps,
  remoteSelectEmits,
} from '../../../remote-select';
import { type PropType, type SlotsType, type ExtractPropTypes } from 'vue';

export const fieldRemoteSelectProps = {
  ...fieldComponentCommonProps,
  componentProps: {
    type: Object as PropType<
      Partial<ExtractPropTypes<RemoteSelectProps>> & {
        'onUpdate:modelValue'?: (value: any) => void;
        onChange?: (value: any) => void;
        [key: PropertyKey]: any;
      }
    >,
  },
  componentSlots: {
    type: Object as PropType<Partial<FieldRemoteSelectSlots>>,
  },
};

export type FieldRemoteSelectProps = ExtractPropTypes<typeof fieldRemoteSelectProps>;

export interface FieldRemoteSelectSlots extends RemoteSelectSlots {}

export const fieldRemoteSelectSlots = Object as SlotsType<RemoteSelectSlots>;

export const fieldRemoteSelectEmits = {
  ...remoteSelectEmits,
};

export const FieldRemoteSelectEmits = typeof fieldRemoteSelectEmits;

import { type FieldComponentCommonProps } from '../common';
import {
  type RemoteSelectEmits,
  type RemoteSelectSlots,
  type RemoteSelectProps,
} from '../../../remote-select';
import { type ExtractPropTypes } from 'vue';

export interface FieldRemoteSelectProps extends FieldComponentCommonProps {
  componentProps?: Partial<ExtractPropTypes<RemoteSelectProps>> & {
    'onUpdate:modelValue'?: (value: any) => void;
    onChange?: (value: any) => void;
    [key: PropertyKey]: any;
  };
  componentSlots?: Partial<FieldRemoteSelectSlots>;
}

export interface FieldRemoteSelectSlots extends RemoteSelectSlots {}

export interface FieldRemoteSelectEmits extends RemoteSelectEmits {}

export type FieldRemoteSelectExpose = {};

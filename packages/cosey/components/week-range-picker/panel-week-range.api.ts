import type { ExtractPropTypes, PropType, SlotsType } from 'vue';
import { type Dayjs } from 'dayjs';

export const panelWeekRangeProps = {
  visible: {
    type: Boolean,
  },
  parsedValue: {
    type: Array as PropType<Date[]>,
  },
};

export type WeekRangePickerProps = ExtractPropTypes<typeof panelWeekRangeProps>;

export interface WeekRangePickerSlots {
  'range-separator': {};
  default: {};
}

export const panelWeekRangeSlots = {} as SlotsType<WeekRangePickerSlots>;

export const panelWeekRangeEmits = {
  pick: (value: Dayjs[] | null) => Array.isArray(value),
  'set-picker-option': (value: any[]) => Array.isArray(value),
};

export type WeekRangePickerEmits = typeof panelWeekRangeEmits;

export interface WeekRangePickerExpose {}

export interface WeekInfo {
  id: number;
  week: number;
  weekStr: string;
  startDate: Dayjs;
  endDate: Dayjs;
  startStr: string;
  endStr: string;
}

import { type PropType } from 'vue';

import { type FieldAutocompleteProps } from './components/autocomplete/autocomplete';
import { type FieldCascaderProps } from './components/cascader/cascader';
import { type FieldCheckboxGroupProps } from './components/checkbox-group/checkbox-group';
import { type FieldCheckboxProps } from './components/checkbox/checkbox';
import { type FieldColorProps } from './components/color/color';
import { type FieldDateProps } from './components/date/date';
import { type FieldDateRangeProps } from './components/date-range/date-range';
import { type FieldDateTimeProps } from './components/date-time/date-time';
import { type FieldDateTimeRangeProps } from './components/date-time-range/date-time-range';
import { type FieldDatesProps } from './components/dates/dates';
import { type FieldInputProps } from './components/input/input';
import { type FieldInputTagProps } from './components/input-tag/input-tag';
import { type FieldMentionProps } from './components/mention/mention';
import { type FieldMonthProps } from './components/month/month';
import { type FieldMonthRangeProps } from './components/month-range/month-range';
import { type FieldMonthsProps } from './components/months/months';
import { type FieldNumberProps } from './components/number/number';
import { type FieldNumberRangeProps } from './components/number-range/number-range';
import { type FieldPasswordProps } from './components/password/password';
import { type FieldRadioGroupProps } from './components/radio-group/radio-group';
import { type FieldRateProps } from './components/rate/rate';
import { type FieldRemoteSelectProps } from './components/remote-select/remote-select.api';
import { type FieldSegmentedProps } from './components/segmented/segmented';
import { type FieldSelectProps } from './components/select/select';
import { type FieldSelectV2Props } from './components/select-v2/select-v2';
import { type FieldSliderProps } from './components/slider/slider';
import { type FieldSwitchProps } from './components/switch/switch';
import { type FieldTextareaProps } from './components/textarea/textarea';
import { type FieldTimeProps } from './components/time/time';
import { type FieldTimeRangeProps } from './components/time-range/time-range';
import { type FieldTimeSelectProps } from './components/time-select/time-select';
import { type FieldTransferProps } from './components/transfer/transfer';
import { type FieldTreeSelectProps } from './components/tree-select/tree-select';
import { type FieldUploadProps } from './components/upload/upload';
import { type FieldWeekProps } from './components/week/week';
import { type FieldYearProps } from './components/year/year';
import { type FieldYearRangeProps } from './components/year-range/year-range';
import { type FieldYearsProps } from './components/years/years';

import Autocomplete from './components/autocomplete/autocomplete.vue';
import Cascader from './components/cascader/cascader.vue';
import Checkbox from './components/checkbox/checkbox.vue';
import CheckboxGroup from './components/checkbox-group/checkbox-group.vue';
import Color from './components/color/color.vue';
import Date from './components/date/date.vue';
import DateRange from './components/date-range/date-range.vue';
import DateTime from './components/date-time/date-time.vue';
import DateTimeRange from './components/date-time-range/date-time-range.vue';
import Dates from './components/dates/dates.vue';
import Input from './components/input/input.vue';
import InputTag from './components/input-tag/input-tag.vue';
import Mention from './components/mention/mention.vue';
import Month from './components/month/month.vue';
import MonthRange from './components/month-range/month-range.vue';
import Months from './components/months/months.vue';
import Number from './components/number/number.vue';
import NumberRange from './components/number-range/number-range.vue';
import Password from './components/password/password.vue';
import RadioGroup from './components/radio-group/radio-group.vue';
import Rate from './components/rate/rate.vue';
import RemoteSelect from './components/remote-select/remote-select';
import Segmented from './components/segmented/segmented.vue';
import Select from './components/select/select.vue';
import SelectV2 from './components/select-v2/select-v2.vue';
import Slider from './components/slider/slider.vue';
import Switch from './components/switch/switch.vue';
import Textarea from './components/textarea/textarea.vue';
import Time from './components/time/time.vue';
import TimeRange from './components/time-range/time-range.vue';
import TimeSelect from './components/time-select/time-select.vue';
import Transfer from './components/transfer/transfer.vue';
import TreeSelect from './components/tree-select/tree-select.vue';
import Upload from './components/upload/upload.vue';
import Week from './components/week/week.vue';
import Year from './components/year/year.vue';
import YearRange from './components/year-range/year-range.vue';
import Years from './components/years/years.vue';

export interface MapFieldTypeComponentProps {
  autocomplete: FieldAutocompleteProps;
  cascader: FieldCascaderProps;
  checkbox: FieldCheckboxProps;
  checkboxgroup: FieldCheckboxGroupProps;
  color: FieldColorProps;
  date: FieldDateProps;
  daterange: FieldDateRangeProps;
  dates: FieldDatesProps;
  datetime: FieldDateTimeProps;
  datetimerange: FieldDateTimeRangeProps;
  input: FieldInputProps;
  inputtag: FieldInputTagProps;
  mention: FieldMentionProps;
  month: FieldMonthProps;
  monthrange: FieldMonthRangeProps;
  months: FieldMonthsProps;
  number: FieldNumberProps;
  numberrange: FieldNumberRangeProps;
  password: FieldPasswordProps;
  radiogroup: FieldRadioGroupProps;
  rate: FieldRateProps;
  remoteselect: FieldRemoteSelectProps;
  segmented: FieldSegmentedProps;
  select: FieldSelectProps;
  selectv2: FieldSelectV2Props;
  slider: FieldSliderProps;
  switch: FieldSwitchProps;
  textarea: FieldTextareaProps;
  time: FieldTimeProps;
  timerange: FieldTimeRangeProps;
  timeselect: FieldTimeSelectProps;
  transfer: FieldTransferProps;
  treeselect: FieldTreeSelectProps;
  upload: FieldUploadProps;
  week: FieldWeekProps;
  year: FieldYearProps;
  yearrange: FieldYearRangeProps;
  years: FieldYearsProps;
  custom: Record<string, any>;
}

export const mapFieldTypeComponent = {
  autocomplete: Autocomplete,
  cascader: Cascader,
  checkbox: Checkbox,
  checkboxgroup: CheckboxGroup,
  color: Color,
  date: Date,
  daterange: DateRange,
  dates: Dates,
  datetime: DateTime,
  datetimerange: DateTimeRange,
  input: Input,
  inputtag: InputTag,
  mention: Mention,
  month: Month,
  monthrange: MonthRange,
  months: Months,
  number: Number,
  numberrange: NumberRange,
  password: Password,
  radiogroup: RadioGroup,
  rate: Rate,
  remoteselect: RemoteSelect,
  segmented: Segmented,
  select: Select,
  selectv2: SelectV2,
  slider: Slider,
  switch: Switch,
  textarea: Textarea,
  time: Time,
  timerange: TimeRange,
  timeselect: TimeSelect,
  transfer: Transfer,
  treeselect: TreeSelect,
  upload: Upload,
  week: Week,
  year: Year,
  yearrange: YearRange,
  years: Years,
  custom: {
    name: 'FieldCustom',
  },
};

export type FieldType = keyof MapFieldTypeComponentProps;

export interface FeildProps<T extends FieldType> {
  readonly?: boolean;
  type?: T;
  componentProps?: MapFieldTypeComponentProps[T]['componentProps'];
  componentSlots?: MapFieldTypeComponentProps[T]['componentSlots'];
  componentRef?: (el: any) => void;
}

export const fieldProps = {
  readonly: {
    type: Boolean,
  },
  type: {
    type: String as PropType<FieldType>,
  },
  componentProps: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentProps']>,
  },
  componentSlots: {
    type: Object as PropType<MapFieldTypeComponentProps[FieldType]['componentSlots']>,
  },
  componentRef: {
    type: Function as PropType<(el: any) => void>,
  },
};

export * from './components/common';

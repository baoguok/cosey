<template>
  <el-segmented
    v-model="readonly"
    :options="[
      {
        label: '只读',
        value: true,
      },
      {
        label: '编辑',
        value: false,
      },
    ]"
    size="large"
    class="mb-5"
  />

  <co-form
    ref="form"
    :model="formModel"
    label-position="top"
    grid
    :row-props="{
      gutter: 32,
    }"
    :col-props="{
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6,
    }"
    :readonly="readonly"
    :submit="onSubmit"
  >
    <co-form-item
      v-model="formModel.autocomplete"
      label="autocomplete"
      field-type="autocomplete"
      :field-props="{
        fetchSuggestions: querySearch,
      }"
    />
    <co-form-item
      v-model="formModel.cascader"
      label="cascader"
      field-type="cascader"
      :field-props="{ options: cascaderOptions }"
    />
    <co-form-item
      v-model="formModel.checkbox"
      label="checkbox"
      field-type="checkbox"
      :field-props="{ label: '记住密码' }"
    />
    <co-form-item
      v-model="formModel.checkboxgroup"
      label="checkboxgroup"
      field-type="checkboxgroup"
      :field-props="{ options }"
    />
    <co-form-item v-model="formModel.color" label="color" field-type="color" />
    <co-form-item v-model="formModel.year" label="year" field-type="year" />
    <co-form-item v-model="formModel.years" label="years" field-type="years" />
    <co-form-item v-model="formModel.month" label="month" field-type="month" />
    <co-form-item v-model="formModel.months" label="months" field-type="months" />
    <co-form-item v-model="formModel.date" label="date" field-type="date" />
    <co-form-item v-model="formModel.dates" label="dates" field-type="dates" />
    <co-form-item label="datetime" field-type="datetime" v-model="formModel.datetime" />
    <co-form-item v-model="formModel.week" label="week" field-type="week" />
    <co-form-item
      v-model="formModel.datetimerange"
      label="datetimerange"
      field-type="datetimerange"
    />
    <co-form-item v-model="formModel.daterange" label="daterange" field-type="daterange" />
    <co-form-item v-model="formModel.monthrange" label="monthrange" field-type="monthrange" />
    <co-form-item v-model="formModel.yearrange" label="yearrange" field-type="yearrange" />
    <co-form-item v-model="formModel.number" label="number" field-type="number" />
    <co-form-item v-model="formModel.mention" label="mention" field-type="mention" />
    <co-form-item v-model="formModel.password" label="password" field-type="password" />
    <co-form-item
      v-model="formModel.radiogroup"
      label="radiogroup"
      field-type="radiogroup"
      :field-props="{ options }"
    />
    <co-form-item v-model="formModel.rate" label="rate" field-type="rate" />
    <co-form-item
      v-model="formModel.segmented"
      label="segmented"
      field-type="segmented"
      :field-props="{ options }"
    />
    <co-form-item
      v-model="formModel.select"
      label="select"
      field-type="select"
      :field-props="{ options }"
    />
    <co-form-item
      v-model="formModel.selectv2"
      label="selectv2"
      field-type="selectv2"
      :field-props="{ options: virtualOptions }"
    />
    <co-form-item v-model="formModel.slider" label="slider" field-type="slider" />
    <co-form-item v-model="formModel.switch" label="switch" field-type="switch" />
    <co-form-item v-model="formModel.input" label="input" field-type="input" />
    <co-form-item v-model="formModel.textarea" label="textarea" field-type="textarea" />
    <co-form-item v-model="formModel.inputtag" label="inputtag" field-type="inputtag" />
    <co-form-item v-model="formModel.time" label="time" field-type="time" />
    <co-form-item v-model="formModel.timerange" label="timerange" field-type="timerange" />
    <co-form-item v-model="formModel.timeselect" label="timeselect" field-type="timeselect" />
    <co-form-item
      v-model="formModel.treeselect"
      label="treeselect"
      field-type="treeselect"
      :field-props="{
        data: treeSelectData,
      }"
    />
    <co-form-item
      v-model="formModel.transfer"
      label="transfer"
      field-type="transfer"
      :field-props="{
        data: transferData,
      }"
      :col-props="{
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
      }"
    />
  </co-form>
</template>

<script lang="ts" setup>
import { reactive, ref, useTemplateRef } from 'vue';
import {
  loadAll,
  treeSelectData,
  cascaderOptions,
  options,
  virtualOptions,
  generateData,
  Option,
} from './data';

const readonly = ref(false);

// autocomplete
interface RestaurantItem {
  value: string;
  link: string;
}

const restaurants = ref<RestaurantItem[]>(loadAll());

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  cb(results);
};

const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const transferData = ref<Option[]>(generateData());

const formModel = reactive({
  autocomplete: 'vue-router',
  cascader: ['component', 'form', 'cascader'],
  checkbox: true,
  checkboxgroup: ['Option2', 'Option3'],
  color: '#008CFF',
  year: new Date(),
  years: [new Date(2000, 0), new Date(2002, 0), new Date(2004, 0)],
  month: new Date(),
  months: [new Date(2000, 0), new Date(2000, 3), new Date(2000, 5)],
  date: new Date(),
  dates: [new Date(2000, 0, 1), new Date(2000, 0, 3), new Date(2000, 0, 5)],
  datetime: new Date(),
  week: new Date(),
  datetimerange: [new Date(2000, 0, 1, 0, 0, 0), new Date(2000, 0, 31, 23, 59, 59)] as [Date, Date],
  daterange: [new Date(2000, 0, 1), new Date(2000, 0, 15)] as [Date, Date],
  monthrange: [new Date(2000, 0), new Date(2000, 6)] as [Date, Date],
  yearrange: [new Date(2000, 0), new Date(2005, 0)] as [Date, Date],
  number: 9999 as number | undefined,
  mention: 'admin',
  password: '123456',
  radiogroup: 'Option2',
  rate: 3,
  segmented: 'Option2',
  select: 'Option2',
  selectv2: 'Option2',
  slider: 75,
  switch: true,
  input: '一段文本',
  inputtag: ['tag1', 'tag2', 'tag3'],
  textarea: '一段多行文本',
  time: new Date(),
  timerange: [new Date(2000, 0, 1, 9, 0, 0), new Date(2000, 0, 1, 18, 0, 0)] as [Date, Date],
  timeselect: '12:00',
  transfer: [1, 3, 7],
  treeselect: '3-1-1',
});

const formRef = useTemplateRef('form');

const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('验证成功');
  });
};
</script>

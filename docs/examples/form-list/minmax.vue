<template>
  <co-form :model="formModel" label-width="auto" :submit="onSubmit">
    <co-form-item
      v-model="formModel.activity"
      prop="activity"
      label="活动名称"
      width="md"
      :rules="[{ required: true }]"
    />
    <co-form-list
      v-model="formModel.awards"
      prop="awards"
      label="活动奖品"
      :rules="[{ type: 'array', required: true }]"
      :min="1"
      :max="3"
      v-slot="{ row, getProp }"
    >
      <co-form-item
        v-model="row.award"
        :prop="getProp('award')"
        label="奖品"
        field-type="select"
        :field-props="{ options: awards }"
        width="sm"
        :rules="[{ required: true }]"
      />
      <co-form-item
        v-model="row.num"
        :prop="getProp('num')"
        label="数量"
        width="sm"
        :rules="[{ required: true }]"
      />
    </co-form-list>
  </co-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { awards } from './data';
import { ElMessage } from 'element-plus';

const formModel = reactive<{
  activity: string;
  awards: {
    award: string;
    num: string;
  }[];
}>({
  activity: '',
  awards: [],
});

const onSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(formModel);
  ElMessage.success('提交成功');
};
</script>

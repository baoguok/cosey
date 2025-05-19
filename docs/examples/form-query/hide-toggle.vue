<template>
  <co-form-query :model="formModel" :min-fields="0" :submit="onSubmit">
    <co-form-item
      v-model="formModel.name"
      prop="name"
      label="签约客户名称"
      field-type="input"
      :rules="[{ required: true }]"
    />
    <co-form-item
      v-model="formModel.company"
      prop="company"
      label="我方公司名称"
      field-type="input"
    />
    <co-form-item
      v-model="formModel.contract.name"
      prop="contract.name"
      label="合同名称"
      field-type="input"
    />
    <co-form-item
      v-model="formModel.contract.createTime"
      prop="contract.createTime"
      label="合同生效时间"
      field-type="daterange"
    />
    <co-form-item
      v-model="formModel.useMode"
      prop="useMode"
      label="合同约定生效方式"
      field-type="select"
      :field-props="{
        options: [
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ],
      }"
      readonly
    />
    <co-form-item
      v-model="formModel.unusedMode"
      prop="unusedMode"
      label="合同约定失效方式"
      field-type="select"
      :field-props="{
        options: [
          {
            value: 'time',
            label: '履行完终止',
          },
        ],
      }"
    />
    <co-form-item v-model="formModel.id" prop="id" label="主合同编号" field-type="input" />
    <co-form-item
      v-model="formModel.project"
      prop="project"
      label="项目名称"
      field-type="input"
      disabled
    />
    <co-form-item
      v-model="formModel.mangerName"
      prop="mangerName"
      label="商务经理"
      field-type="input"
      disabled
    />
  </co-form-query>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const formModel = reactive({
  name: '蚂蚁设计有限公司',
  company: undefined,
  contract: {
    name: undefined,
    createTime: undefined,
  },
  useMode: 'chapter',
  unusedMode: undefined,
  id: undefined,
  project: 'xxxx项目',
  mangerName: '启途',
});

const onSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  ElMessage.success('提交成功');
};
</script>

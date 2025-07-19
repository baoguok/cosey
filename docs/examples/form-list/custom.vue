<template>
  <co-form :model="formModel" label-width="80px" :submit="onSubmit">
    <co-form-item
      v-model="formModel.department"
      prop="department"
      label="部门"
      width="md"
      :rules="[{ required: true }]"
    />
    <co-form-list
      v-model="formModel.employees"
      prop="employees"
      label="员工"
      :rules="[{ type: 'array', required: true }]"
    >
      <template #custom="{ list, getKey, getProp, add, remove, move }">
        <div class="flex flex-col gap-y-4">
          <co-dnd-sort @move="move">
            <co-transition-group effect="fade">
              <co-dnd-sort-item v-for="(row, index) in list" :key="getKey(row)" :index="index">
                <el-card shadow="never" class="relative gap-4">
                  <el-space direction="vertical" fill size="large">
                    <el-space size="large">
                      <co-form-item
                        v-model="row.name"
                        :prop="getProp(index, 'name')"
                        label="姓名"
                        width="sm"
                        :rules="[{ required: true }]"
                      />
                      <co-form-item
                        v-model="row.gender"
                        :prop="getProp(index, 'gender')"
                        label="性别"
                        field-type="radiogroup"
                        :field-props="{ options: genders }"
                        width="sm"
                        :rules="[{ required: true }]"
                      />
                    </el-space>
                    <el-space size="large">
                      <co-form-item
                        v-model="row.num"
                        :prop="getProp(index, 'num')"
                        label="工号"
                        width="sm"
                        :rules="[{ required: true }]"
                      />
                      <co-form-item
                        v-model="row.tel"
                        :prop="getProp(index, 'tel')"
                        label="电话"
                        width="sm"
                        :rules="[{ required: true }]"
                      />
                    </el-space>
                    <co-form-item
                      v-model="row.address"
                      :prop="getProp(index, 'address')"
                      label="地址"
                      field-type="textarea"
                      :rules="[{ required: true }]"
                    />
                  </el-space>
                  <el-button class="absolute end-3 top-3" link type="danger" @click="remove(index)">
                    <co-icon name="carbon:trash-can" size="lg" />
                  </el-button>
                </el-card>
              </co-dnd-sort-item>
            </co-transition-group>
          </co-dnd-sort>

          <el-button plain class="w-full" @click="() => add()">
            <co-icon name="carbon:add-large" class="me-1" />
            新增
          </el-button>
        </div>
      </template>
    </co-form-list>
  </co-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { genders } from './data';
import { ElMessage } from 'element-plus';

const formModel = reactive<{
  department: string;
  employees: {
    name: string;
    gender: string;
    num: string;
    tel: string;
    address: string;
  }[];
}>({
  department: '',
  employees: [],
});

const onSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(formModel);
  ElMessage.success('提交成功');
};
</script>

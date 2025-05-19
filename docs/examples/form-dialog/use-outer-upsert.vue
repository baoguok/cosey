<template>
  <el-button type="primary" @click="upsert.add()">新增（外部）</el-button>
  <el-button
    type="primary"
    @click="
      upsert.edit({
        name: '张三',
        mobile: '13800138000',
      })
    "
  >
    编辑（外部）
  </el-button>

  <UserUpser :ref="upsert.ref" />
</template>

<script lang="ts" setup>
import { useOuterUpsert } from 'cosey/hooks';
import UserUpser from './user-upsert.vue';

const upsert = useOuterUpsert({
  success() {
    console.log('刷新页面');
  },
});
</script>

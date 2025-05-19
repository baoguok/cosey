<template>
  <el-popover placement="top" :width="300" trigger="hover">
    <template #reference>
      <div>
        <el-button link size="large">查看登录账号</el-button>
      </div>
    </template>

    <el-descriptions border size="small" title="管理员">
      <el-descriptions-item label="账号">admin</el-descriptions-item>
      <el-descriptions-item label="密码">123456</el-descriptions-item>
    </el-descriptions>

    <el-descriptions border size="small" title="文章编辑" class="mt-5">
      <el-descriptions-item label="账号">editor</el-descriptions-item>
      <el-descriptions-item label="密码">123456</el-descriptions-item>
    </el-descriptions>
  </el-popover>
</template>

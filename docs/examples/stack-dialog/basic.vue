<template>
  <el-button @click="visible1 = true">显示对话框</el-button>

  <co-stack-dialog v-model="visible1" title="对话框1">
    <el-button @click="visible2 = true">显示对话框</el-button>
  </co-stack-dialog>
  <co-stack-dialog v-model="visible2" title="对话框2">
    <el-button @click="visible3 = true">显示对话框</el-button>
  </co-stack-dialog>
  <co-stack-dialog v-model="visible3" title="对话框3">
    <el-button @click="visible4 = true">显示对话框</el-button>
  </co-stack-dialog>
  <co-stack-dialog v-model="visible4" title="对话框4">
    <el-button @click="visible5 = true">显示对话框</el-button>
  </co-stack-dialog>
  <co-stack-dialog v-model="visible5" title="对话框5"></co-stack-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
</script>

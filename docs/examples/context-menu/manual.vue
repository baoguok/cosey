<template>
  <el-button class="m-2" @click="onClick">点击鼠标左键触发</el-button>

  <co-context-menu ref="contextMenu" @command="onCommand">
    <co-context-menu-item icon="carbon:copy" title="复制" command="copy" />
    <co-context-menu-item title="粘贴" command="paste" />
  </co-context-menu>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { useTemplateRef } from 'vue';

const contextMenuRef = useTemplateRef('contextMenu');

const onClick = (event: MouseEvent) => {
  contextMenuRef.value?.open(event.clientX, event.clientY);
};

const onCommand = (command: any) => {
  ElMessage(command);
};
</script>

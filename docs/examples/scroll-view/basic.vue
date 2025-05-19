<template>
  <co-scroll-view style="height: 400px; border: 1px solid var(--el-border-color)">
    <div
      v-for="i in 20"
      :key="i"
      style="margin: 5px; border: 1px solid var(--el-border-color); padding: 20px"
    >
      {{ i }}
    </div>
  </co-scroll-view>
</template>

<script lang="ts" setup></script>

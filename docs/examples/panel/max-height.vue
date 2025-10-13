<template>
  <co-panel header="标题" max-height="200px">
    <p v-for="n in 15" :key="n">内容{{ n }}</p>
  </co-panel>
</template>

<script lang="ts" setup></script>

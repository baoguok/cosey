<template>
  <co-week-range-picker
    start-placeholder="开始"
    end-placeholder="结束"
    v-model="value"
  ></co-week-range-picker>

  <div class="mt-2">
    <el-button @click="onClick">set value</el-button>
  </div>

  <div>{{ format(value) }}</div>
</template>

<script lang="ts" setup>
import { dayjs } from 'element-plus';
import { ref } from 'vue';

const value = ref();

const onClick = () => {
  value.value = [new Date('2025-06-22T16:00:00.000Z'), new Date('2025-09-27T15:59:59.999Z')];
};

const format = (value) => value?.map((item) => dayjs(item).format('YYYY-MM-DD HH:mm:ss'));
</script>

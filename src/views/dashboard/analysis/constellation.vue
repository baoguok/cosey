<template>
  <el-card shadow="never">
    <template #header>
      <span>星座数据统计</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { useTemplateRef } from 'vue';

const { getStatConstellation } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const { setOption } = useEcharts(elRef, {
  option: {
    tooltip: {},
    legend: {
      type: 'scroll',
    },
    series: [{ type: 'pie', radius: '70%' }],
  },
});

useFetch<any[]>(() => getStatConstellation(), {
  onSuccess(data) {
    setOption({
      dataset: {
        source: data,
      },
    });
  },
});
</script>

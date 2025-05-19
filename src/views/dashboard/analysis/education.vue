<template>
  <el-card shadow="never">
    <template #header>
      <span>学历数据统计</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { useTemplateRef } from 'vue';

const { getStatEducation } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const { setOption } = useEcharts(elRef, {
  option: {
    dataset: {
      source: [],
      dimensions: [
        'qualification',
        {
          name: 'male',
          displayName: '男',
        },
        {
          name: 'female',
          displayName: '女',
        },
      ],
    },
    tooltip: {},
    legend: {
      right: 0,
    },
    xAxis: { type: 'category', name: '学历' },
    yAxis: {
      name: '数量',
    },
    series: [
      {
        type: 'line',
        stack: 'x',
        areaStyle: {},
      },
      {
        type: 'line',
        stack: 'x',
        areaStyle: {},
      },
    ],
  },
});

useFetch<Record<string, any>>(() => getStatEducation(), {
  onSuccess(data) {
    setOption({
      dataset: {
        source: data,
      },
    });
  },
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <span>体态分布</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { useTemplateRef } from 'vue';

const { getStatStature } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const { setOption } = useEcharts(elRef, {
  option: {
    dataset: [
      {
        source: [],
        dimensions: ['gender', 'weight', 'height'],
      },
      {
        transform: [
          {
            type: 'filter',
            config: {
              dimension: 'gender',
              value: '男',
            },
          },
        ],
      },
      {
        transform: [
          {
            type: 'filter',
            config: {
              dimension: 'gender',
              value: '女',
            },
          },
        ],
      },
    ],
    legend: {
      right: 0,
    },
    tooltip: {
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'value',
      name: '体重',
      axisLabel: {
        formatter: '{value} kg',
      },
      splitLine: {
        show: false,
      },
      min: 'dataMin',
    },
    yAxis: {
      type: 'value',
      name: '身高',
      axisLabel: {
        formatter: '{value} cm',
      },
      splitLine: {
        show: false,
      },
      min: 'dataMin',
    },
    series: [
      {
        type: 'scatter',
        name: '男',
        encode: {
          x: 'weight',
          y: 'height',
        },
        datasetIndex: 1,
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'AVG' }],
        },
      },
      {
        type: 'scatter',
        name: '女',
        encode: {
          x: 'weight',
          y: 'height',
        },
        datasetIndex: 2,
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'AVG' }],
        },
      },
    ],
  },
});

useFetch<Record<string, any>>(() => getStatStature(), {
  onSuccess(data) {
    setOption({
      dataset: [
        {
          source: data,
        },
      ],
    });
  },
});
</script>

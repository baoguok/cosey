<template>
  <el-card shadow="never">
    <template #header>
      <span>{{ t('analysis.bodyTypeDistribution') }}</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import statisticsApi from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { computed, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { getStatStature } = statisticsApi;

const elRef = useTemplateRef('elRef');

const sourceData = ref<any[]>([]);

useEcharts(
  elRef,
  computed(() => ({
    option: {
      dataset: [
        {
          source: sourceData.value,
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
        name: t('analysis.weight'),
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
        name: t('analysis.height'),
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
          name: t('analysis.male'),
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
          name: t('analysis.female'),
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
  })),
);

useFetch<any[]>(() => getStatStature(), {
  onSuccess(data) {
    sourceData.value = data;
  },
});
</script>

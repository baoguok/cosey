<template>
  <el-card shadow="never">
    <template #header>
      <span>{{ t('analysis.educationStats') }}</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { computed, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { getStatEducation } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const sourceData = ref<any[]>([]);

useEcharts(
  elRef,
  computed(() => ({
    option: {
      dataset: {
        source: sourceData.value,
        dimensions: [
          'qualification',
          {
            name: 'male',
            displayName: t('analysis.male'),
          },
          {
            name: 'female',
            displayName: t('analysis.female'),
          },
        ],
      },
      tooltip: {},
      legend: {
        right: 0,
      },
      xAxis: { type: 'category', name: t('analysis.education') },
      yAxis: {
        name: t('analysis.quantity'),
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
  })),
);

useFetch<any[]>(() => getStatEducation(), {
  onSuccess(data) {
    sourceData.value = data;
  },
});
</script>

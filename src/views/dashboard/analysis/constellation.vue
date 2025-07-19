<template>
  <el-card shadow="never">
    <template #header>
      <span>{{ t('analysis.zodiacStats') }}</span>
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

const { getStatConstellation } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const sourceData = ref<any[]>([]);

useEcharts(
  elRef,
  computed(() => ({
    option: {
      dataset: {
        source: sourceData.value,
      },
      tooltip: {},
      legend: {
        type: 'scroll',
      },
      series: [{ type: 'pie', radius: '70%' }],
    },
  })),
);

useFetch<any[]>(() => getStatConstellation(), {
  onSuccess(data) {
    sourceData.value = data;
  },
});
</script>

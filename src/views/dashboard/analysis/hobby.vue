<template>
  <el-card shadow="never">
    <template #header>
      <span>{{ t('analysis.hobbyStats') }}</span>
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

const { getStatHobby } = statisticsApi;

const elRef = useTemplateRef('elRef');

const sourceData = ref<{
  male: { hobby: string; count: number }[];
  female: { hobby: string; count: number }[];
}>({
  male: [],
  female: [],
});

useEcharts(
  elRef,
  computed(() => ({
    option: {
      tooltip: {},
      legend: {
        right: 0,
      },
      radar: {
        indicator: sourceData.value.male.map((item) => {
          return { name: item.hobby };
        }),
      },
      series: [
        {
          type: 'radar',
          data: sourceData.value.male.length
            ? [
                {
                  value: sourceData.value.male.map((item) => item.count),
                  name: t('analysis.male'),
                },
                {
                  value: sourceData.value.female.map((item) => item.count),
                  name: t('analysis.female'),
                },
              ]
            : undefined,
        },
      ],
    },
  })),
);

useFetch<{
  male: { hobby: string; count: number }[];
  female: { hobby: string; count: number }[];
}>(() => getStatHobby(), {
  onSuccess(data) {
    sourceData.value = data;
  },
});
</script>

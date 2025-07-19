<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span>{{ t('analysis.activityTrend') }}</span>
        <div>
          <el-segmented
            v-model="model.type"
            :options="options"
            :disabled="isFetching"
            @change="onChange"
          />
        </div>
      </div>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { computed, reactive, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { getStatTrend } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const sourceData = ref<any[]>([]);

useEcharts(
  elRef,
  computed(() => ({
    option: {
      dataset: {
        source: sourceData.value,
        dimensions: ['label', 'value'],
      },
      tooltip: {},
      xAxis: { type: 'category' },
      yAxis: {
        name: t('analysis.quantity'),
      },
      series: {
        type: 'bar',
      },
    },
  })),
);

const options = computed(() => [
  { label: t('analysis.today'), value: 'day' },
  { label: t('analysis.thisWeek'), value: 'week' },
  { label: t('analysis.thisMonth'), value: 'month' },
  { label: t('analysis.thisYear'), value: 'year' },
]);

const model = reactive({
  type: 'day',
});

const { isFetching, execute } = useFetch<any[]>(() => getStatTrend(model), {
  onSuccess(data) {
    sourceData.value = data;
  },
});

const onChange = () => {
  execute();
};
</script>

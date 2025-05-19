<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span>活跃趋势</span>
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
import { reactive, ref, useTemplateRef } from 'vue';

const { getStatTrend } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const { setOption } = useEcharts(elRef, {
  option: {
    dataset: {
      source: [],
      dimensions: ['label', 'value'],
    },
    tooltip: {},
    xAxis: { type: 'category' },
    yAxis: {
      name: '数量',
    },
    series: {
      type: 'bar',
    },
  },
});

const options = ref([
  { label: '今日', value: 'day' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '全年', value: 'year' },
]);

const model = reactive({
  type: 'day',
});

const { isFetching, execute } = useFetch<Record<string, any>>(() => getStatTrend(model), {
  onSuccess(data) {
    setOption({
      dataset: {
        source: data,
      },
    });
  },
});

const onChange = () => {
  execute();
};
</script>

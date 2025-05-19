<template>
  <el-card shadow="never">
    <template #header>
      <span>爱好数据统计</span>
    </template>
    <div ref="elRef" style="height: 300px"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { useStatisticsApi } from '@/api/statistics';
import { useEcharts, useFetch } from 'cosey/hooks';
import { useTemplateRef } from 'vue';

const { getStatHobby } = useStatisticsApi();

const elRef = useTemplateRef('elRef');

const { setOption } = useEcharts(elRef, {
  option: {
    tooltip: {},
    legend: {
      right: 0,
    },
    series: [{ type: 'radar', areaStyle: {} }],
  },
});

useFetch<{
  male: { hobby: string; count: number }[];
  female: { hobby: string; count: number }[];
}>(() => getStatHobby(), {
  onSuccess(data) {
    setOption({
      radar: {
        indicator: data.male.map((item) => {
          return { name: item.hobby };
        }),
      },
      series: [
        {
          data: [
            {
              value: data.male.map((item) => item.count),
              name: '男',
            },
            {
              value: data.female.map((item) => item.count),
              name: '女',
            },
          ],
        },
      ],
    });
  },
});
</script>

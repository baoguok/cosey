<template>
  <div style="max-width: 300px">
    <co-long-text :text="text" :rows="2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref(
  '大江东去，浪淘尽，千古风流人物。故垒西边，人道是：三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间、樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
);
</script>

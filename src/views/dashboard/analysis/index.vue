<template>
  <co-container>
    <div class="flex flex-col gap-y-4">
      <Overview />
      <Trend />
      <co-row :gutter="16" class="gap-y-4">
        <co-col :sm="{ span: 12 }">
          <Education />
        </co-col>
        <co-col :sm="{ span: 12 }">
          <Stature />
        </co-col>
      </co-row>

      <co-row :gutter="16" class="gap-y-4">
        <co-col :sm="{ span: 12 }">
          <Hobby />
        </co-col>
        <co-col :sm="{ span: 12 }">
          <Constellation />
        </co-col>
      </co-row>
    </div>
  </co-container>
</template>

<script lang="ts" setup>
import Overview from './overview.vue';
import Trend from './trend.vue';
import Education from './education.vue';
import Stature from './stature.vue';
import Hobby from './hobby.vue';
import Constellation from './constellation.vue';
</script>

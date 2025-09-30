<template>
  <MergedLayoutSwitchEffect>
    <div v-show="name === layoutStore.activeTab" :class="[hashId, prefixCls]">
      <div v-loading="loading" :class="`${prefixCls}-loading`">
        <iframe :src="src" :class="`${prefixCls}-iframe`" @load="onLoad" />
      </div>
    </div>
  </MergedLayoutSwitchEffect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MergedLayoutSwitchEffect from '../merged/layout-switch-effect';
import { useLayoutStore } from '../../store';

import useStyle from './style';
import { useComponentConfig } from '../../components';

defineOptions({
  name: 'CoLayoutIframeItem',
});

defineProps<{
  name: string;
  src: string;
}>();

const { prefixCls } = useComponentConfig('layout-iframe');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const loading = ref(true);

const onLoad = () => {
  loading.value = false;
};
</script>

<template>
  <div
    :class="[
      hashId,
      prefixCls,
      {
        'is-hide': layoutStore.defaultMenus.length === 0,
      },
    ]"
    :style="asideStyle"
  >
    <div
      v-show="layoutStore.isMobile || !layoutStore.includeHorizontal"
      :class="`${prefixCls}-header`"
      :style="{ height: `${layoutStore.topbarHeight - 1}px` }"
    >
      <MergedLayoutBrand
        :hide-logo="
          !layoutStore.isMobile &&
          (layoutStore.menuType === 'biserial' || layoutStore.menuType === 'horizontal-biserial')
        "
        :hide-name="!layoutStore.isMobile && layoutStore.collapse"
      />
    </div>
    <ScrollView :class="`${prefixCls}-body`">
      <MergedLayoutMenu />
    </ScrollView>
    <div v-if="!layoutStore.isMobile" :class="`${prefixCls}-footer`">
      <el-button text bg size="small" @click="layoutStore.collapse = !layoutStore.collapse">
        <Icon size="lg" :name="layoutStore.collapse ? 'co:chevron-right' : 'co:chevron-left'" />
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutMenu from '../merged/layout-menu';
import { useLayoutStore } from '../../store';
import { ScrollView, Icon, useComponentConfig } from '../../components';
import useStyle from './style';

defineOptions({
  name: 'LayoutAside',
});

const { prefixCls } = useComponentConfig('layout-aside');

const { hashId } = useStyle(prefixCls);

const layoutStore = useLayoutStore();

const asideStyle = computed(() => {
  return {
    width:
      (layoutStore.defaultMenus.length === 0
        ? 0
        : layoutStore.collapse
          ? layoutStore.collapsedAsideWidth
          : layoutStore.asideWidth) + 'px',
  };
});
</script>

<template>
  <div :class="[hashId, prefixCls]">
    <div :class="`${prefixCls}-display`">
      <slot name="display"></slot>
    </div>

    <div :class="`${prefixCls}-toolbar`">
      <co-copy :text="decodedSource" />

      <el-button link @click="onToggle">
        <co-icon name="carbon:code" />
      </el-button>
    </div>

    <el-collapse-transition>
      <div v-show="show" v-html="decodedCode" :class="`${prefixCls}-code`"></div>
    </el-collapse-transition>

    <el-collapse-transition>
      <div v-show="show" :class="`${prefixCls}-fold`">
        <el-button link :class="`${prefixCls}-fold-button`" @click="onHide">
          <co-icon name="carbon:code-hide" size="lg" />
          <span :class="`${prefixCls}-fold-text`">隐藏源代码</span>
        </el-button>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts" setup>
import { useComponentConfig, Icon as CoIcon, Copy as CoCopy } from 'cosey/components';
import { ElCollapseTransition, ElButton } from 'element-plus';
import { computed, ref } from 'vue';
import useStyle from './style';

const props = defineProps<{
  code?: string;
  source?: string;
}>();

const { prefixCls } = useComponentConfig('docs-demo');

const { hashId } = useStyle(prefixCls);

const decodedSource = computed(() => decodeURIComponent(props.source));
const decodedCode = computed(() => decodeURIComponent(props.code));

const show = ref(false);

const onToggle = () => {
  show.value = !show.value;
};

const onHide = () => {
  show.value = false;
};
</script>

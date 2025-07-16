<template>
  <Picker :popper-class="[hashId, prefixCls]" v-model:visible="innerVisible">
    <slot></slot>

    <template #content>
      <div :class="`${prefixCls}-title`">预设</div>
      <div :class="`${prefixCls}-preset`">
        <div v-for="(row, i) in colorPalettes" :key="i" :class="`${prefixCls}-row`">
          <div v-for="(color, j) in row" :key="j" :class="`${prefixCls}-item`">
            <button
              type="button"
              :class="[`${prefixCls}-color`, `${prefixCls}-btn`]"
              :style="{ background: color }"
              @click="onSelect(color)"
            ></button>
          </div>
        </div>
      </div>

      <div :class="`${prefixCls}-title`">最近使用</div>
      <div :class="`${prefixCls}-row`">
        <div v-for="(color, i) in mapHistoryColors" :key="i" :class="`${prefixCls}-item`">
          <button
            type="button"
            :class="[
              `${prefixCls}-color`,
              `${prefixCls}-btn`,
              {
                'is-empty': !color,
              },
            ]"
            :style="{ background: color }"
            @click="onSelect(color)"
          ></button>
        </div>
      </div>

      <div :class="`${prefixCls}-title`">手动设置</div>
      <div :class="`${prefixCls}-manual`">
        <button
          v-if="isEyeDropperSupported"
          type="button"
          :class="[`${prefixCls}-btn`]"
          @click="onAbsorb"
        >
          <Icon name="co:eyedropper" size="lg" />
        </button>
        <ElInput
          v-model="inputColor"
          size="small"
          placeholder="请输入"
          :class="[`${prefixCls}-input`]"
        />
        <button
          type="button"
          :class="[`${prefixCls}-color`, `${prefixCls}-btn`]"
          :style="{ backgroundColor: normalInputColor }"
          @click="onCustomSelect"
        ></button>
        <button
          type="button"
          :class="[`${prefixCls}-color`, `${prefixCls}-btn`, `${prefixCls}-clear`]"
          @click="onClear"
        >
          <Icon name="co:slash-forward" size="lg" />
        </button>
      </div>
    </template>
  </Picker>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Picker from '../picker/picker.vue';
import { useComponentConfig } from '../../config-provider';
import useStyle from './color-picker.style';
import { colorNames, colorPalettes } from './color-picker';
import Icon from '../../icon/icon.vue';
import { ElInput } from 'element-plus';
import { TinyColor } from '@ctrl/tinycolor';
import { useHistoryColor } from './useHistoryColor';

const { prefixCls } = useComponentConfig('editor-color-picker');
const { hashId } = useStyle(prefixCls);

const props = defineProps<{
  visible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
  (e: 'select', color: string): void;
  (e: 'clear'): void;
}>();

const innerVisible = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  },
});

const inputColor = ref('');

const { historyColors, pushHistory } = useHistoryColor();

const mapHistoryColors = computed(() => {
  return Array(colorNames.length)
    .fill(0)
    .map((_, i) => {
      return historyColors.value[i] || '';
    });
});

const normalInputColor = computed(() => new TinyColor(inputColor.value).toHexString());

const isEyeDropperSupported = computed(() => typeof (window as any).EyeDropper === 'function');

const select = (color: string) => {
  pushHistory(color);
  emit('select', color);
  emit('update:visible', false);
};

const onSelect = (color: string) => {
  if (color) {
    select(color);
  }
};

const onCustomSelect = () => {
  select(normalInputColor.value);
};

const onClear = () => {
  emit('clear');
  emit('update:visible', false);
};

const onAbsorb = () => {
  const eyeDropper = new (window as any).EyeDropper();
  eyeDropper.open().then((result: any) => {
    inputColor.value = result.sRGBHex;
  });
};
</script>

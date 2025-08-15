<template>
  <el-form ref="form" v-bind="elFormProps" :class="[hashId, prefixCls]">
    <Row v-if="grid" v-bind="mergedRowProps" @size-change="handleSizeChange">
      <component :is="template" />
      <FormItem :class="`${prefixCls}-form-item-buttons`">
        <div :class="`${prefixCls}-buttons`">
          <slot name="button" :reset="reset" :submit="submit" :submitting="submitting">
            <el-button
              v-if="!hideSubmit"
              @click="() => submit()"
              type="primary"
              :loading="submitting"
            >
              {{ t('co.form.search') }}
            </el-button>
            <el-button v-if="!hideReset" @click="reset">{{ t('co.form.reset') }}</el-button>
          </slot>
          <Toggle v-if="showToggle" v-model="innerCollapsed" />
        </div>
      </FormItem>
    </Row>
    <slot v-else></slot>
  </el-form>
</template>

<script setup lang="ts">
import {
  type FormQueryProps,
  type FormQuerySlots,
  type FormQueryEmits,
  type FormQueryContext,
  formQueryProps,
  formQueryContextSymbol,
  defaultMapSizeColNumber,
} from './form-query';
import { ElForm, ElButton } from 'element-plus';
import { useFormTemplate, FormItem } from '../form';
import { type RowSize, Row } from '../row';
import { Toggle } from '../toggle';
import { cloneVNode, computed, isVNode, provide, ref, Fragment } from 'vue';
import { useTwoWayBinding } from '../../hooks';
import { defineTemplate } from '../../utils';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'FormQuery',
});

const props = defineProps(formQueryProps);

const slots = defineSlots<FormQuerySlots>();

const emit = defineEmits<FormQueryEmits>();

const { prefixCls } = useComponentConfig('form-query', props);

const { hashId } = useStyle(prefixCls);

const { t } = useLocale();

// main
const { elFormProps, expose, reset, submit, submitting } = useFormTemplate<FormQueryProps>(props);

const mergedRowProps = computed(() => {
  return Object.assign(
    {
      gutter: 24,
    },
    props.rowProps,
  );
});

// collapsed
const innerCollapsed = useTwoWayBinding(props, emit, 'collapsed');

const mapSizeColNumber = computed(() => {
  return Object.assign(defaultMapSizeColNumber, props.colProps);
});
const rowSize = ref<RowSize>('xs');
const colNumber = computed(() => 24 / mapSizeColNumber.value[rowSize.value]);
const rowNumber = ref(1);

const handleSizeChange = (size: RowSize) => {
  rowSize.value = size;
};

const fieldNumber = computed(() => {
  const content = slots.default?.({});
  if (!content) {
    return 0;
  }
  if (content.length === 1 && content[0].type === Fragment) {
    return content[0].children?.length || 0;
  }
  return content.length || 0;
});

const showToggle = computed(() => {
  return (
    props.minFields !== 0 &&
    fieldNumber.value > props.minFields &&
    fieldNumber.value + 1 > colNumber.value
  );
});

provide<FormQueryContext>(formQueryContextSymbol, {
  shouldHide(index: number) {
    if (props.minFields === 0 || !innerCollapsed.value) {
      return false;
    }
    if (props.minFields > 0) {
      return index > props.minFields - 1;
    }
    const indexToShow = rowNumber.value * colNumber.value - 2;
    return indexToShow < 0 ? index > 0 : index > indexToShow;
  },
});

const template = defineTemplate(() => {
  const content = slots.default?.({}) || [];

  const children =
    content.length === 1 && content[0].type === Fragment ? content[0].children : content;

  return children.map((item: any, index: number) => {
    return isVNode(item)
      ? cloneVNode(item, {
          internalIndex: index,
        })
      : item;
  });
});

defineExpose(expose);
</script>

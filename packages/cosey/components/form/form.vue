<template>
  <el-form ref="form" v-bind="elFormProps" :class="[hashId, prefixCls]">
    <OptionalWrapper :when="grid" :component="Row" :props="rowProps">
      <slot></slot>
      <FormItem v-if="!readonly && !formBubbleContext" :class="`${prefixCls}-form-item-buttons`">
        <template #label></template>
        <div>
          <slot name="button" :reset="reset" :submit="submit" :submitting="submitting">
            <el-button
              v-if="!hideSubmit"
              type="primary"
              v-bind="submitProps"
              :loading="submitting"
              @click="() => submit()"
            >
              {{ t(submitText) }}
            </el-button>
            <el-button v-if="!hideReset" v-bind="resetProps" @click="reset">
              {{ t(resetText) }}
            </el-button>
          </slot>
        </div>
      </FormItem>
    </OptionalWrapper>
  </el-form>
</template>

<script setup lang="ts">
import {
  type FormProps,
  type FormSlots,
  type FormEmits,
  type FormBubbleContext,
  formProps,
  formBubbleContextSymbol,
} from './form';
import { ElForm, ElButton } from 'element-plus';
import { useFormTemplate } from './useFormTemplate';
import { inject, reactive, toRef } from 'vue';
import { Row } from '../row';
import { OptionalWrapper } from '../optional-wrapper';
import FormItem from './form-item.vue';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'Form',
});

const props = defineProps(formProps);

defineSlots<FormSlots>();

defineEmits<FormEmits>();

const { prefixCls } = useComponentConfig('form', props);

const { hashId } = useStyle(prefixCls);

const { t } = useLocale();

const { elFormProps, expose, reset, resetFields, submit, clearValidate, submitting } =
  useFormTemplate<FormProps>(props);

const formBubbleContext = inject<FormBubbleContext | null>(formBubbleContextSymbol, null);

formBubbleContext?.setFormBubbleData(
  reactive({
    readonly: toRef(() => props.readonly),
    submitting,
    reset,
    resetFields,
    clearValidate,
    submit,
  }),
);

defineExpose(expose);
</script>

<template>
  <Button @click="onBtnClick">
    <Icon name="co:function-math" />
  </Button>

  <FormDialog v-model="visible" title="LaTeX 公式" width="760px">
    <Row :gutter="8" style="row-gap: 8px">
      <Col :sm="8">
        <Panel header="数学公式" maxHeight="300px">
          <ElSpace fill>
            <ElButton
              v-for="item in formulas"
              :key="item.formula"
              @click="formModel.formula = item.formula"
            >
              {{ item.name }}
            </ElButton>
          </ElSpace>
        </Panel>
      </Col>
      <Col :sm="16">
        <ElSpace fill style="display: flex">
          <Panel header="编辑公式">
            <Form :model="formModel" :submit="onSubmit">
              <ElInput
                v-model="formModel.formula"
                type="textarea"
                placeholder="请输入公式"
                resize="none"
                :rows="6"
              />
            </Form>
          </Panel>
          <Panel header="预览">
            <div ref="preview" style="height: 80px"></div>
          </Panel>
        </ElSpace>
      </Col>
    </Row>
  </FormDialog>
</template>

<script lang="ts" setup>
import { inject, ref, useTemplateRef, watch, reactive } from 'vue';
import { ElButton, ElSpace } from 'element-plus';
import katex from 'katex';
import { toolbarContextKey } from '../toolbarContext';
import Button from '../../button.vue';
import { Panel } from '../../../../panel';
import { formulas } from './formula';
import { FormDialog } from '../../../../form-dialog';
import { Form } from '../../../../form';
import Row from '../../../../row';
import Col from '../../../../col';
import Icon from '../../../../icon';

const { toolbar } = inject(toolbarContextKey)!;

// form

const visible = ref(false);

const formModel = reactive({
  formula: '',
});

const onSubmit = () => {
  if (formModel.formula) {
    toolbar.value!.formula(formModel.formula);
  }
};

const onBtnClick = () => {
  visible.value = true;
};

const previewEl = useTemplateRef('preview');

watch([previewEl, () => formModel.formula], ([el, formula]) => {
  if (el) {
    katex.render(formula, el, {
      throwOnError: false,
      errorColor: '#f00',
      output: 'mathml',
    });
  }
});
</script>

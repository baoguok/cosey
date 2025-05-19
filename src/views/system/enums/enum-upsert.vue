<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" label="名称" required />
      <co-form-item v-model="model.remark" prop="remark" label="备注" />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useEnumsApi } from '@/api/system/enums';
import { useUpsert } from 'cosey/hooks';

const { addEnum, updateEnum } = useEnumsApi();

interface Model {
  name?: string;
  remark?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
  remark: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '枚举',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addEnum(model),
  edit: () => updateEnum(editId.value!, model),
});

defineExpose(expose);
</script>

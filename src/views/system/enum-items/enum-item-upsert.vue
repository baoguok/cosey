<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" label="名称" required />
      <co-form-item v-model="model.value" prop="value" label="值" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useEnumsApi } from '@/api/system/enums';
import { useUpsert } from 'cosey/hooks';

const { addEnumItem, updateEnumItem } = useEnumsApi();

interface Model {
  name?: string;
  value?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
  value: undefined,
});

const editId = ref<number>();

const { dialogProps, formProps, expose, data } = useUpsert<Model, Row, number>({
  stuffTitle: '枚举项',
  model,
  beforeFill(row) {
    editId.value = row.id;
  },
  add: () => addEnumItem(data.value!, model),
  edit: () => updateEnumItem(data.value!, editId.value!, model),
});

defineExpose(expose);
</script>

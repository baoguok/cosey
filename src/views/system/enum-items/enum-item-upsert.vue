<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" :label="t('enum.name')" required />
      <co-form-item v-model="model.value" prop="value" :label="t('enum.value')" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useEnumsApi } from '@/api/system/enums';
import { useUpsert } from 'cosey/hooks';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const { dialogProps, formProps, expose, data } = useUpsert<Model, Row, number>(
  computed(() => ({
    stuffTitle: t('enum.enumItem'),
    model,
    addFetch: () => addEnumItem(data.value!, model),
    editFetch: (row) => updateEnumItem(data.value!, row.id, model),
  })),
);

defineExpose(expose);
</script>

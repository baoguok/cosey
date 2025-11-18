<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" :label="t('enum.name')" required />
      <co-form-item v-model="model.remark" prop="remark" :label="t('enum.remark')" />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import enumsApi from '@/api/system/enums';
import { useUpsert } from 'cosey/hooks';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addEnum, updateEnum } = enumsApi;

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

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('enum.enum'),
    model,
    addFetch: () => addEnum(model),
    editFetch: (row) => updateEnum(row.id, model),
  })),
);

defineExpose(expose);
</script>

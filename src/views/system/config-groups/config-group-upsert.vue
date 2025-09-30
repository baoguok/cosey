<template>
  <co-form-dialog v-bind="dialogProps">
    <co-form v-bind="formProps" label-width="auto" width="sm">
      <co-form-item v-model="model.name" prop="name" :label="t('config.name')" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useConfigGroupsApi } from '@/api/system/configs';
import { useUpsert } from 'cosey/hooks';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addConfigGroup, updateConfigGroup } = useConfigGroupsApi();

interface Model {
  name?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('config.config'),
    model,
    addFetch: () => addConfigGroup(model),
    editFetch: (row) => updateConfigGroup(row.id, model),
  })),
);

defineExpose(expose);
</script>

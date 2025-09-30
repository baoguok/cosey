<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.name" prop="name" :label="t('rbac.roleName')" required />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useUpsert } from 'cosey/hooks';
import { useRolesApi } from '@/api/rbac/roles';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addRole, updateRole } = useRolesApi();

interface Model {
  name?: string;
}

interface Row extends Omit<Model, 'roles'> {
  id: number;
}

const model = reactive<Model>({
  name: undefined,
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('rbac.role'),
    model,
    addFetch: () => addRole(model),
    editFetch: (row) => updateRole(row.id, model),
  })),
);

defineExpose(expose);
</script>

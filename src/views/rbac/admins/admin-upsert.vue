<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.username" prop="username" :label="t('rbac.username')" required />
      <co-form-item
        v-model="model.password"
        prop="password"
        :label="t('rbac.password')"
        field-type="password"
      />
      <co-form-item v-model="model.nickname" prop="nickname" :label="t('rbac.nickname')" required />
      <co-form-item
        v-model="model.roles"
        prop="roles"
        :label="t('rbac.role')"
        required
        field-type="select"
        :field-props="{
          options: roleOptions,
          multiple: true,
          valueKey: 'id',
          labelKey: 'name',
        }"
      />
      <co-form-item prop="avatar" :label="t('rbac.avatar')">
        <co-upload v-model="model.avatar" single />
      </co-form-item>
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useAdminsApi } from '@/api/rbac/admins';
import { useRolesApi } from '@/api/rbac/roles';
import { useUpsert } from 'cosey/hooks';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addAdmin, updateAdmin } = useAdminsApi();
const { getRoles } = useRolesApi();

interface Model {
  username?: string;
  password?: string;
  nickname?: string;
  avatar?: string;
  roles: number[];
}

interface Role {
  name: string;
  id: number;
}

interface Row extends Omit<Model, 'roles'> {
  id: number;
  roles: Role[];
}

const model = reactive<Model>({
  username: undefined,
  password: undefined,
  nickname: undefined,
  avatar: undefined,
  roles: [],
});

const roleOptions = ref<Role[]>([]);

onMounted(() => {
  getRoles().then((data) => {
    roleOptions.value = data.list;
  });
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('rbac.admin'),
    model,
    beforeFill(row) {
      return {
        ...row,
        roles: row.roles.map((item) => item.id),
      };
    },
    addFetch: () => addAdmin(model),
    editFetch: (row) => updateAdmin(row.id, model),
  })),
);

defineExpose(expose);
</script>

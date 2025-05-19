<template>
  <co-form-dialog v-bind="dialogProps" width="fit-content">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-item v-model="model.username" prop="username" label="用户名" required />
      <co-form-item v-model="model.password" prop="password" label="密码" field-type="password" />
      <co-form-item v-model="model.nickname" prop="nickname" label="昵称" required />
      <co-form-item
        v-model="model.roles"
        prop="roles"
        label="角色"
        required
        field-type="select"
        :field-props="{
          options: roleOptions,
          multiple: true,
          valueKey: 'id',
          labelKey: 'name',
        }"
      />
      <co-form-item prop="avatar" label="头像">
        <co-upload v-model="model.avatar" single />
      </co-form-item>
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useAdminsApi } from '@/api/rbac/admins';
import { useRolesApi } from '@/api/rbac/roles';
import { useUpsert } from 'cosey/hooks';

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

const editId = ref<number>();

const roleOptions = ref<Role[]>([]);

onMounted(() => {
  getRoles().then((data) => {
    roleOptions.value = data.list;
  });
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '管理员',
  model,
  beforeFill(row) {
    editId.value = row.id;

    return {
      ...row,
      roles: row.roles.map((item) => item.id),
    };
  },
  add: () => addAdmin(model),
  edit: () => updateAdmin(editId.value!, model),
});

defineExpose(expose);
</script>

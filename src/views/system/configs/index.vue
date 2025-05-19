<template>
  <co-container full-page>
    <co-table v-bind="tableProps">
      <template #toolbar-left>
        <el-button v-if="can('create', 'system_config')" type="primary" @click="upsert.add()">
          新增
        </el-button>
        <el-button
          v-if="can('read', 'system_config_group')"
          type="primary"
          @click="configGroupsRef?.open()"
        >
          配置组
        </el-button>
      </template>
      <template #action="{ row }">
        <co-table-action
          :actions="[
            {
              hidden: cannot('update', 'system_config'),
              label: '编辑',
              icon: 'carbon:edit',
              onClick: () => {
                upsert.edit(row);
              },
            },
            {
              hidden: cannot('delete', 'system_config'),
              label: '删除',
              icon: 'carbon:trash-can',
              type: 'danger',
              popconfirm: {
                title: '确定删除？',
                confirm: () => onDelete(row.id),
              },
            },
          ]"
        />
      </template>
    </co-table>

    <ConfigUpsert :ref="upsert.ref" />

    <ConfigGroups ref="configGroups" />
  </co-container>
</template>

<script lang="tsx" setup>
import { ElMessage } from 'element-plus';
import { useConfigGroupsApi, useConfigsApi } from '@/api/system/configs';
import ConfigUpsert from './configs-upsert.vue';
import { useFetch, useOuterUpsert } from 'cosey/hooks';
import { LongText, MediaCard, MediaCardGroup, useTable } from 'cosey/components';
import { ref, useTemplateRef } from 'vue';
import ConfigGroups from '../config-groups/index.vue';
import { useAbility } from '@casl/vue';

defineOptions({
  name: 'SystemConfigs',
});

const { can, cannot } = useAbility();

const { getConfigs, deleteConfig } = useConfigsApi();
const { getConfigGroups } = useConfigGroupsApi();

const configGroupOptions = ref<any[]>([]);

const [tableProps, { reload }] = useTable({
  api: getConfigs,
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'group.name', label: '所属组' },
    { prop: 'name', label: '名称', minWidth: 200 },
    {
      prop: 'value',
      label: '值',
      minWidth: 300,
      formatter(row, _, cellValue) {
        switch (row.type) {
          case 'textarea':
            return <LongText text={cellValue} />;
          case 'image':
            return <MediaCard src={cellValue} />;
          case 'album':
            return <MediaCardGroup srcset={cellValue} size="small" />;
          case 'bool':
            return cellValue ? '是' : '否';
          case 'text':
          case 'number':
            return cellValue;
        }
      },
    },
    { prop: 'key', label: 'Key' },
    { prop: 'createdAt', label: '创建时间', renderer: 'datetime' },
    { prop: 'updatedAt', label: '更新时间', renderer: 'datetime' },
  ],
  actionColumn: {
    label: '操作',
    slots: 'action',
    fixed: 'right',
    minWidth: 140,
  },
  height: '100%',
  formProps: {
    schemes: [
      {
        prop: 'groupId',
        label: '所属组',
        fieldType: 'select',
        fieldProps: {
          options: configGroupOptions,
          labelKey: 'name',
          valueKey: 'id',
        },
      },
      { prop: 'name', label: '名称' },
      { prop: 'key', label: 'Key' },
    ],
  },
});

const upsert = useOuterUpsert({
  success() {
    reload();
  },
});

const onDelete = async (id: number) => {
  return deleteConfig(id).then(() => {
    ElMessage.success('删除成功');
    reload();
  });
};

useFetch<{ list: any[] }>(() => getConfigGroups(), {
  onSuccess(data) {
    configGroupOptions.value = data.list;
  },
});

const configGroupsRef = useTemplateRef('configGroups');
</script>

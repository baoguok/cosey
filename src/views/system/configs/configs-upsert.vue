<template>
  <co-form-dialog v-bind="dialogProps" width="md" destroy-on-close>
    <co-form v-bind="formProps" label-width="auto">
      <co-form-item
        v-model="model.groupId"
        prop="groupId"
        label="配置组"
        field-type="select"
        :field-props="{
          options: configGroups,
          labelKey: 'name',
          valueKey: 'id',
        }"
        required
      />
      <co-form-item v-model="model.name" prop="name" label="名称" required />
      <co-form-item v-model="model.key" prop="key" label="Key" required />
      <co-form-item
        v-model="model.type"
        prop="type"
        label="类型"
        required
        field-type="radiogroup"
        :field-props="{
          options: configTypes,
          labelKey: 'name',
          valueKey: 'value',
        }"
      />
      <co-form-item
        v-if="model.type === 'textarea'"
        v-model="model.typeModel.textarea"
        prop="typeModel.textarea"
        label="值"
        field-type="textarea"
        :field-props="{
          rows: 3,
        }"
        required
      />
      <co-form-item
        v-if="model.type === 'text'"
        v-model="model.typeModel.text"
        prop="typeModel.text"
        label="值"
        required
      />
      <co-form-item
        v-if="model.type === 'number'"
        v-model="model.typeModel.number"
        prop="typeModel.number"
        label="值"
        field-type="number"
        required
      />
      <co-form-item
        v-if="model.type === 'bool'"
        v-model="model.typeModel.bool"
        prop="typeModel.bool"
        label="值"
        field-type="radiogroup"
        :field-props="{
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' },
          ],
        }"
        required
      />
      <co-form-item
        v-if="model.type === 'album'"
        v-model="model.typeModel.album"
        prop="typeModel.album"
        label="值"
        field-type="upload"
        :field-props="{
          limit: 12,
          multiple: true,
        }"
        required
      />
      <co-form-item
        v-if="model.type === 'image'"
        v-model="model.typeModel.image"
        prop="typeModel.image"
        label="值"
        field-type="upload"
        :field-props="{
          single: true,
        }"
        required
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useConfigGroupsApi, useConfigsApi } from '@/api/system/configs';
import { useFetch, useUpsert } from 'cosey/hooks';
import { useEnumsApi } from '@/api/system/enums';
import { omit } from 'lodash-es';

const { addConfig, updateConfig } = useConfigsApi();

interface Model {
  groupId?: number;
  name?: string;
  type?: 'textarea' | 'image' | 'album' | 'number' | 'bool' | 'text';
  value?: string | string[];
  key?: string;

  typeModel: TypeModel;
}

interface TypeModel {
  textarea?: string;
  image?: string;
  album?: string[];
  number?: number;
  bool?: boolean;
  text?: string;
}

interface Row extends Model {
  id: number;
}

const typeModel = reactive<TypeModel>({
  textarea: undefined,
  image: undefined,
  album: undefined,
  number: undefined,
  bool: undefined,
  text: undefined,
});

const model = reactive<Model>({
  groupId: undefined,
  name: undefined,
  type: 'text',
  value: undefined,
  key: undefined,

  typeModel,
});

const editId = ref<number>();

const convertModel = () => {
  model.value = model.typeModel[model.type!] as any;
  return omit(model, ['typeModel']);
};

const { dialogProps, formProps, expose } = useUpsert<Model, Row>({
  stuffTitle: '配置',
  model,
  beforeFill(row) {
    editId.value = row.id;

    model.typeModel[row.type!] = row.value as any;
  },
  add: () => addConfig(convertModel()),
  edit: () => updateConfig(editId.value!, convertModel()),
});

defineExpose(expose);

const { getEnumItemsByEnumName } = useEnumsApi();

const { data: configTypes } = useFetch<any[]>(() => getEnumItemsByEnumName('config_type'));

// group

const { getConfigGroups } = useConfigGroupsApi();

const configGroups = ref<any[]>([]);

useFetch<{ list: any[] }>(() => getConfigGroups(), {
  onSuccess(data) {
    configGroups.value = data.list;
  },
});
</script>

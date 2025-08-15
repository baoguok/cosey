<template>
  <co-form-dialog v-bind="dialogProps" width="md" destroy-on-close>
    <co-form v-bind="formProps" label-width="auto">
      <co-form-item
        v-model="model.groupId"
        prop="groupId"
        :label="t('config.configGroup')"
        field-type="select"
        :field-props="{
          options: configGroups,
          labelKey: 'name',
          valueKey: 'id',
        }"
        required
      />
      <co-form-item v-model="model.name" prop="name" :label="t('config.name')" required />
      <co-form-item v-model="model.key" prop="key" label="Key" required />
      <co-form-item
        v-model="model.type"
        prop="type"
        :label="t('config.type')"
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
        :label="t('config.value')"
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
        :label="t('config.value')"
        required
      />
      <co-form-item
        v-if="model.type === 'number'"
        v-model="model.typeModel.number"
        prop="typeModel.number"
        :label="t('config.value')"
        field-type="number"
        required
      />
      <co-form-item
        v-if="model.type === 'bool'"
        v-model="model.typeModel.bool"
        prop="typeModel.bool"
        :label="t('config.value')"
        field-type="radiogroup"
        :field-props="{
          options: [
            { value: true, label: t('config.yes') },
            { value: false, label: t('config.no') },
          ],
        }"
        required
      />
      <co-form-item
        v-if="model.type === 'album'"
        v-model="model.typeModel.album"
        prop="typeModel.album"
        :label="t('config.value')"
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
        :label="t('config.value')"
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
import { computed, reactive, ref } from 'vue';
import { useConfigGroupsApi, useConfigsApi } from '@/api/system/configs';
import { useFetch, useUpsert } from 'cosey/hooks';
import { useEnumsApi } from '@/api/system/enums';
import { omit } from 'lodash-es';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const convertModel = () => {
  model.value = model.typeModel[model.type!] as any;
  return omit(model, ['typeModel']);
};

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('config.config'),
    model,
    onEdit(row) {
      model.typeModel[row.type!] = row.value as any;
    },
    addFetch: () => addConfig(convertModel()),
    editFetch: (row) => updateConfig(row.id, convertModel()),
  })),
);

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

<template>
  <co-form-dialog v-bind="dialogProps" width="lg" ref="dialog">
    <co-form v-bind="formProps" label-width="auto" width="md">
      <co-form-group>
        <co-form-item v-model="model.nickname" prop="nickname" :label="t('user.nickname')" />
        <co-form-item v-model="model.mobile" prop="mobile" :label="t('user.phone')" />
        <co-form-item v-model="model.name" prop="name" :label="t('user.name')" />
        <co-form-item
          v-model="model.gender"
          prop="gender"
          :label="t('user.gender')"
          field-type="radiogroup"
          :field-props="{
            options: mock.genders,
          }"
        />
        <co-form-item
          v-model="model.birthday"
          prop="birthday"
          :label="t('user.birthday')"
          field-type="date"
        />
        <co-form-item
          v-model="model.constellation"
          prop="constellation"
          :label="t('user.zodiac')"
          field-type="select"
          :field-props="{ options: mock.zodiacSigns }"
        />
        <co-form-item v-model="model.height" prop="height" :label="t('user.height')" />
        <co-form-item v-model="model.weight" prop="weight" :label="t('user.weight')" />
        <co-form-item
          v-model="model.qualification"
          prop="qualification"
          :label="t('user.education')"
          field-type="select"
          :field-props="{ options: mock.qualifications }"
        />
        <co-form-item
          v-model="model.trait"
          prop="trait"
          :label="t('user.traits')"
          field-type="select"
          :field-props="{ options: mock.traits }"
        />
        <co-form-item
          v-model="model.friendshipType"
          prop="friendshipType"
          :label="t('user.datingType')"
          field-type="select"
          :field-props="{ options: mock.friendshipTypes }"
        />
        <co-form-item v-model="model.signature" prop="signature" :label="t('user.signature')" />
      </co-form-group>
      <co-form-item
        v-model="model.hobbies"
        prop="hobbies"
        :label="t('user.hobbies')"
        width="auto"
        field-type="checkboxgroup"
        :field-props="{ options: mock.hobbies, max: 4 }"
      />
      <co-form-item
        v-model="model.avatar"
        prop="avatar"
        :label="t('user.avatar')"
        width="md"
        field-type="upload"
        :field-props="{ single: true }"
      />
    </co-form>
  </co-form-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useUsersApi } from '@/api/users';
import { useUpsert } from 'cosey/hooks';
import * as mock from '@gunny/mock';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { addUser, updateUser } = useUsersApi();

interface Model {
  nickname?: string;
  mobile?: string;
  name?: string;
  gender?: string;
  birthday?: string;
  constellation?: string;
  height?: string;
  weight?: string;
  qualification?: string;
  trait?: string;
  friendshipType?: string;
  hobbies?: string[];
  signature?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Row extends Model {
  id: number;
}

const model = reactive<Model>({
  nickname: undefined,
  mobile: undefined,
  name: undefined,
  gender: undefined,
  birthday: undefined,
  constellation: undefined,
  height: undefined,
  weight: undefined,
  qualification: undefined,
  trait: undefined,
  friendshipType: undefined,
  hobbies: undefined,
  signature: undefined,
  avatar: undefined,
});

const { dialogProps, formProps, expose } = useUpsert<Model, Row>(
  computed(() => ({
    stuffTitle: t('user.user'),
    model,
    addFetch: () => addUser(model),
    editFetch: (row) => updateUser(row.id, model),
  })),
);

defineExpose(expose);
</script>

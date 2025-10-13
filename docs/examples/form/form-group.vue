<template>
  <co-form-group alignment="flex-end">
    <co-form-item v-model="model.state1" label="field1" field-type="input" width="sm" />
    <co-form-item v-model="model.state2" label="field2" field-type="input" width="sm" />
  </co-form-group>

  <co-form-group title="表单组">
    <co-form-item v-model="model.state3" label="field3" field-type="input" width="sm" />
    <co-form-item v-model="model.state4" label="field4" field-type="input" width="sm" />
  </co-form-group>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const model = reactive({
  state1: '',
  state2: '',
  state3: '',
  state4: '',
});
</script>

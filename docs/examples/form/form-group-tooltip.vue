<template>
  <co-form-group title="表单组" tooltip="这是提示">
    <co-form-item v-model="model.state1" label="field3" field-type="input" width="sm" />
    <co-form-item v-model="model.state2" label="field4" field-type="input" width="sm" />
  </co-form-group>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const model = reactive({
  state1: '',
  state2: '',
});
</script>

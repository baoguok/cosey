<template>
  <el-button @click="insert">随机插入</el-button>
  <el-button @click="reset">重置</el-button>
  <el-button @click="shuffle">打乱</el-button>

  <co-transition-group effect="slide" tag="ul">
    <li v-for="item in items" class="item" :key="item">
      {{ item }}
      <el-button @click="remove(item)">x</el-button>
    </li>
  </co-transition-group>
</template>

<script lang="ts" setup>
import { shuffle as _shuffle } from 'lodash-es';
import { ref } from 'vue';

const getInitialItems = () => [1, 2, 3, 4, 5];
const items = ref(getInitialItems());
let id = items.value.length + 1;

function insert() {
  const i = Math.round(Math.random() * items.value.length);
  items.value.splice(i, 0, id++);
}

function reset() {
  items.value = getInitialItems();
  id = items.value.length + 1;
}

function shuffle() {
  items.value = _shuffle(items.value);
}

function remove(item: number) {
  const i = items.value.indexOf(item);
  if (i > -1) {
    items.value.splice(i, 1);
  }
}
</script>

<template>
  <div id="vditor"/>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditor = ref<Vditor | null>(null);

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    minHeight: 500,
    placeholder: "请随便写吧",
    counter: {
      enable: true
    }
  });
});

</script>

<style scoped></style>
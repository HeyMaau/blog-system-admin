<script setup lang="ts">

import AudioList from "../../components/AudioList.vue";
</script>

<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>媒体管理</el-breadcrumb-item>
      <el-breadcrumb-item>音频列表</el-breadcrumb-item>
    </el-breadcrumb>
    <AudioList/>
  </div>
</template>

<style scoped>

</style>
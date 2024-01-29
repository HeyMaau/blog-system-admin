<script setup lang="ts">
import FriendLinkList from "../FriendLinkList.vue";
</script>

<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友情链接管理</el-breadcrumb-item>
    </el-breadcrumb>
    <FriendLinkList/>
  </div>
</template>

<style scoped>

</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>想法管理</el-breadcrumb-item>
      <el-breadcrumb-item>想法列表</el-breadcrumb-item>
    </el-breadcrumb>
    <ThinkingList/>
  </div>

</template>

<script>
import ThinkingList from "@/components/ThinkingList";

export default {
  name: "ThinkingPage",
  components: {ThinkingList}
}
</script>

<style scoped>

</style>
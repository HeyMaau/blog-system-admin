<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <CommentList type="0"/>
  </div>
</template>

<script>
import CommentList from "@/components/pages/CommentPage.vue";

export default {
  name: "ArticleCommentPage",
  components: {CommentList},
  beforeMount() {
    document.title = '文章管理 - 评论列表 | 后台管理 - 卧卷'
  }
}
</script>

<style scoped>

</style>
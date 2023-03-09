<template>
  <div>
    <el-menu
        :default-active="$route.path"
        router
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#f0c800">
      <el-menu-item :index="process.env.VUE_APP_ROUTER_PREFIX">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item :index="process.env.VUE_APP_ROUTER_PREFIX + '/user'">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu :index="process.env.VUE_APP_ROUTER_PREFIX + '/article'">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item :index="process.env.VUE_APP_ROUTER_PREFIX + '/article'">文章列表</el-menu-item>
        <el-menu-item :index="process.env.VUE_APP_ROUTER_PREFIX + '/category'">分类列表</el-menu-item>
        <el-menu-item :index="process.env.VUE_APP_ROUTER_PREFIX + '/comment'">评论列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideBar",
}
</script>

<style scoped>

.el-menu {
  border: 0;
  font-weight: bold;
}

.el-submenu__title i, .el-menu-item i {
  color: white;
}

</style>
<template>
  <div>
    <el-menu
        :default-active="$route.path"
        router
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#f0c800">
      <el-menu-item index="/">
        <el-icon>
          <PieChart/>
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon>
          <User/>
        </el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-sub-menu index="/article">
        <template #title>
          <el-icon>
            <Memo/>
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/article">文章列表</el-menu-item>
        <el-menu-item index="/category">分类列表</el-menu-item>
        <el-menu-item index="/article/comment">评论列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/thinking">
        <template #title>
          <el-icon>
            <ChatLineSquare/>
          </el-icon>
          <span>想法管理</span>
        </template>
        <el-menu-item index="/thinking">想法列表</el-menu-item>
        <el-menu-item index="/thinking/comment">评论列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/media">
        <template #title>
          <el-icon>
            <VideoPlay/>
          </el-icon>
          <span>媒体管理</span>
        </template>
        <el-menu-item index="/audio">音频列表</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/friend_link">
        <el-icon>
          <Link/>
        </el-icon>
        <span>友情链接管理</span>
      </el-menu-item>
      <el-menu-item index="/app">
        <el-icon>
          <SwitchFilled/>
        </el-icon>
        <span>APP版本管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {ChatLineSquare, Memo, PieChart, SwitchFilled, User, VideoPlay} from "@element-plus/icons-vue";


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

<template>
  <el-container>
    <el-header>
      <div class="header-container">
        <img :src="`${publicPath}logo.png`" class="web-logo">
        <div class="header-title">
          管理后台
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <AsideBar/>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from "@/components/AsideBar";

export default {
  name: "MainPage",
  components: {AsideBar},
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style scoped lang="less">

.el-header {
  background-color: white;
  line-height: 60px;
}

.header-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-title {
  //margin-left: 10px;
  font-size: 25px;
  color: #4889F4;
}

.el-aside {
  background-color: #409EFF;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 100%;
}

.el-container {
  height: 100%;
}

.web-logo {
  box-sizing: border-box;
  padding: 5px 0;
  height: 100%;
}
</style>
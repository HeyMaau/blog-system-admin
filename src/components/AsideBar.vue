<template>
  <div>
    <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideBar",
  methods: {
    handleOpen(key) {
      console.log(key);
    },
    handleClose(key) {
      console.log(key);
    },
    handleSelect(key) {
      switch (key) {
        case '2':
          console.log("###" + key)
          this.$router.push('/user').catch(reason => console.log(reason))
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
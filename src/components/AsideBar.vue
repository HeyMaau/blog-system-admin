<template>
  <div>
    <el-menu
        :default-active="$route.path"
        router
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
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
  data() {
    return {
      activePath: '/'
    }
  },
  methods: {
    handleOpen(key) {
      console.log(key);
    },
    handleClose(key) {
      console.log(key);
    },
    handleSelect(key) {
      console.log(key);
      /*switch (key) {
        case '2':
          console.log("###" + key)
          this.$router.push('/user').catch(reason => console.log(reason))
          break
      }*/
      // this.activePath = key
    }
  }
}
</script>

<style scoped>

</style>
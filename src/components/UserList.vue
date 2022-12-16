<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
          :data="userList"
          stripe
          style="width: 100%">
        <el-table-column
            align="center"
            min-width="20%"
            prop="userName"
            label="用户名">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="30%"
            prop="updateTime"
            label="更新时间">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            prop="state"
            label="状态">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            label="操作">
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getUsers} from "@/apis/user_api";

export default {
  name: "UserList",
  data() {
    return {
      currentPage: 1,
      userList: [],
      total: 0,
      size: 5
    }
  },
  methods: {
    async getUserList() {
      const {data: response} = await getUsers(this.currentPage, this.size)
      if (response.code === 20000) {
        this.userList = response.data.content
        this.total = response.data.totalElements
      }
      console.log(response)
    }
    ,
    handleSizeChange(size) {
      this.size = size
      this.getUserList()
    }
    ,
    handleCurrentChange(page) {
      this.page = page
      this.getUserList()
    }
  }
  ,
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>

</style>
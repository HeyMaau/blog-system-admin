<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="search-bar" :gutter="10">
        <el-col :span="8">
          <el-input
              clearable
              @change="getUserList"
              placeholder="请输入用户名或邮箱地址"
              prefix-icon="el-icon-search"
              v-model="searchInput">
          </el-input>
        </el-col>
        <el-col :span="4" id="selector">
          <el-select v-model="searchState" clearable placeholder="请选择用户状态" @change="getUserList">
            <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table
          border
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
          <template slot-scope="scope">
            <i v-if="scope.row.state == 1" class="el-icon-success"></i>
            <i v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state === '1'" type="danger" icon="el-icon-delete" size="mini"
                       @click="deleteUser(scope.row.id)"></el-button>
          </template>
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
import {getUsers, deleteUser} from "@/apis/user_api";
import {CODE_SUCCESS} from "@/utils/constants";

export default {
  name: "UserList",
  data() {
    return {
      currentPage: 1,
      userList: [],
      total: 0,
      size: 5,
      searchInput: '',
      searchState: '',
      stateOptions: [{
        value: '1',
        label: '正常状态'
      }, {
        value: '0',
        label: '删除状态'
      }]
    }
  },
  methods: {
    async getUserList() {
      const {data: response} = await getUsers(this.searchInput, this.searchState, this.currentPage, this.size)
      if (response.code === 20000) {
        this.userList = response.data.content
        this.total = response.data.totalElements
      }
      console.log(response)
    },
    handleSizeChange(size) {
      this.size = size
      this.getUserList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getUserList()
    },
    deleteUser(userID) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: response} = await deleteUser(userID)
        if (response.code === CODE_SUCCESS) {
          this.$message({
            type: 'success',
            message: '删除用户成功!'
          });
          this.getUserList()
        } else {
          this.$message({
            type: 'error',
            message: '系统繁忙，请稍后再试'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
  ,
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>

.search-bar {
  margin-bottom: 10px;
}

#selector {
  width: auto;
}

</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
          border
          :data="categoryList"
          stripe
          style="width: 100%">
        <el-table-column
            align="center"
            prop="name"
            label="分类名称">
        </el-table-column>
        <el-table-column
            align="center"
            prop="pinyin"
            label="分类拼音">
        </el-table-column>
        <el-table-column
            align="center"
            prop="description"
            label="分类描述">
        </el-table-column>
        <el-table-column
            align="center"
            prop="state"
            label="状态">
          <template slot-scope="scope">
            <i v-if="scope.row.state == 1" class="el-icon-success"></i>
            <i v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="updateTime"
            label="更新时间">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == 1" type="danger" icon="el-icon-delete" size="mini"
                       @click="deleteCategory(scope.row.id)"></el-button>
            <el-button v-else type="success" icon="el-icon-refresh-left" size="mini"
                       @click="recoverCategory(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state == 1" type="info" icon="el-icon-setting" size="mini"
                       @click="dialogVisible = true"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
        title="修改分类"
        :visible.sync="dialogVisible"
        width="50%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCategories, recoverCategory, deleteCategory} from "@/apis/category_api";
import {CODE_SUCCESS} from "@/utils/constants";

export default {
  name: "CategoryList",
  data() {
    return {
      categoryList: [],
      currentPage: 1,
      currentSize: 5,
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    handleSizeChange(size) {
      this.currentSize = size
      this.getCategoryList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getCategoryList()
    },
    async getCategoryList() {
      const {data: response} = await getCategories(this.currentPage, this.currentSize)
      console.log(response)
      if (response.code === CODE_SUCCESS) {
        this.categoryList = response.data.content
        this.total = response.data.totalElements
      }
    },
    async deleteCategory(id) {
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: response} = await deleteCategory(id)
        if (response.code === CODE_SUCCESS) {
          this.$message({
            type: 'success',
            message: '删除分类成功!'
          });
          this.getCategoryList()
        } else {
          this.$message({
            type: 'error',
            message: response.message
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateCategory(id) {
      console.log(id)
    },
    async recoverCategory(id) {
      const {data: response} = await recoverCategory(id)
      if (response.code === CODE_SUCCESS) {
        this.getCategoryList()
        this.$message.success("恢复文章分类成功！")
      } else {
        this.$message.error(response.message)
      }
    }
  },
  created() {
    this.getCategoryList()
  }
}
</script>

<style scoped>

.el-dialog__header {
  text-align: left;
}

</style>
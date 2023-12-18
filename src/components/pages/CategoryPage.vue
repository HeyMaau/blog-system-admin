<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="add-category-button">
        <el-button type="primary" @click="showAddCategoryDialog">添加分类</el-button>
      </el-row>
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
            prop="description"
            label="分类描述">
        </el-table-column>
        <el-table-column
            align="center"
            prop="state"
            label="状态">
          <template #default="scope">
            <el-icon v-if="scope.row.state === '1'" :size="20" color="#32CD32">
              <CircleCheckFilled/>
            </el-icon>
            <el-icon v-else :size="20" color="#DC143C">
              <CircleCloseFilled/>
            </el-icon>
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
          <template #default="scope">
            <el-button v-if="scope.row.state === '1'" type="danger" :icon="Delete" size="small"
                       @click="deleteCategory(scope.row.id)"></el-button>
            <el-button v-else type="success" :icon="RefreshLeft" size="small"
                       @click="recoverCategory(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '1'" type="info" :icon="Setting" size="small"
                       @click="showUpdateCategoryDialog(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-config-provider :locale="zhCn">
        <el-pagination
            class="list-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            v-model:page-size="currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-config-provider>
    </el-card>
    <EditCategoryDialog :category="category" :type="editCategoryDialogType" v-model:visibility="editCategoryDialogVisible"
                        @onSuccess="handleSuccess" @onCancel="handleCancel"/>
  </div>
</template>

<script>
import {deleteCategory, getCategoriesApi, recoverCategory} from "@/apis/category_api";
import {CODE_SUCCESS} from "@/utils/constants";
import EditCategoryDialog from "@/components/EditCategoryDialog.vue";
import {deepClone} from "@/utils/clone-util";
import {Delete, RefreshLeft, Setting} from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  name: "CategoryPage",
  computed: {
    zhCn() {
      return zhCn
    },
    Setting() {
      return Setting
    },
    RefreshLeft() {
      return RefreshLeft
    },
    Delete() {
      return Delete
    }
  },
  components: {EditCategoryDialog},
  data() {
    return {
      categoryList: [],
      currentPage: 1,
      currentSize: 5,
      total: 0,
      editCategoryDialogVisible: false,
      category: {
        name: '',
        description: '',
        cover: '',
        tagColor: ''
      },
      editCategoryDialogType: 'add'
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
      const {data: response} = await getCategoriesApi(this.currentPage, this.currentSize)
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
    showUpdateCategoryDialog(category) {
      this.editCategoryDialogType = 'update'
      this.editCategoryDialogVisible = true
      this.resetCategoryForm()
      this.category = deepClone(category)
    },
    async recoverCategory(id) {
      const {data: response} = await recoverCategory(id)
      if (response.code === CODE_SUCCESS) {
        this.getCategoryList()
        this.$message.success("恢复文章分类成功！")
      } else {
        this.$message.error(response.message)
      }
    },
    showAddCategoryDialog() {
      this.editCategoryDialogType = 'add'
      this.editCategoryDialogVisible = true
      this.resetCategoryForm()
    },
    resetCategoryForm() {
      this.category.name = ''
      this.category.description = ''
      this.category.cover = ''
      this.category.tagColor = ''
      this.coverUrl = ''
    },
    handleSuccess() {
      this.editCategoryDialogVisible = false
      this.getCategoryList()
    },
    handleCancel() {
      this.editCategoryDialogVisible = false
    }
  },
  created() {
    this.getCategoryList()
  },
  beforeMount() {
    document.title = '分类列表 | 后台管理 - 卧卷'
  }
}
</script>

<style src="@/assets/css/pagination.css" scoped/>
<style scoped>

.add-category-button {
  text-align: left;
  margin-bottom: 20px;
}

</style>
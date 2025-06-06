<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="search-bar" :gutter="10">
        <el-col :span="8">
          <el-input
              clearable
              @change="getArticleList"
              placeholder="请输入文章关键字"
              :prefix-icon="Search"
              v-model="searchInput">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="searchState" clearable placeholder="请选择文章状态" @change="getArticleList">
            <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" id="add-article-btn">
          <el-button type="primary" @click="addArticle">发表文章</el-button>
        </el-col>
      </el-row>
      <el-table
          border
          :data="articleList"
          stripe
          style="width: 100%">
        <el-table-column
            align="center"
            min-width="16%"
            label="标题">
          <template #default="scope">
            <router-link target="_blank" :to="{ name: 'editArticle', params: { id: scope.row.id }}">{{
                scope.row.title
              }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="12%"
            label="标签">
          <template #default="scope">
            <el-tag id="label-tag" v-for="(item, index) in scope.row.labels" :key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            prop="user.userName"
            label="用户">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            prop="category.name"
            label="分类">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="9%"
            prop="type"
            label="类型">
          <template #default="scope">
            <el-tag v-if="scope.row.type === '0'">富文本</el-tag>
            <el-tag v-else>Markdown</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.state === '0'" type="danger">删除</el-tag>
            <el-tag v-else-if="scope.row.state === '1'" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.state === '2'" type="success">发布</el-tag>
            <el-tag v-else type="warning">置顶</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="18%"
            prop="updateTime"
            label="修改时间">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="15%"
            label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.state !== '0'" type="danger" :icon="Delete" size="small"
                       @click="deleteArticle(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '2'" type="warning" :icon="Top" size="small"
                       @click="topArticle(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '3'" type="info" :icon="Bottom" size="small"
                       @click="topArticle(scope.row.id)"></el-button>
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
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/utils/constants";
import {getArticles, deleteArticleApi, topArticleApi} from "@/apis/article_api";
import {Bottom, Delete, Search, Top} from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  name: "ArticlePage",
  computed: {
    Search() {
      return Search
    },
    zhCn() {
      return zhCn
    },
    Bottom() {
      return Bottom
    },
    Top() {
      return Top
    },
    Delete() {
      return Delete
    }
  },
  data() {
    return {
      currentPage: 1,
      articleList: [],
      total: 0,
      currentSize: 5,
      searchInput: '',
      searchState: '',
      searchCategory: '',
      stateOptions: [{
        value: '2',
        label: '发布状态'
      }, {
        value: '1',
        label: '草稿状态'
      }, {
        value: '3',
        label: '置顶状态'
      }, {
        value: '0',
        label: '删除状态'
      }]
    }
  },
  methods: {
    async getArticleList() {
      const {data: response} = await getArticles(this.currentPage, this.currentSize, this.searchInput, this.searchCategory, this.searchState)
      if (response.code === 20000) {
        response.data.content.forEach(item => {
          item.labels = item.labels.split('-')
        })
        this.articleList = response.data.content
        this.total = response.data.totalElements
      }
    },
    handleSizeChange(size) {
      this.currentSize = size
      this.getArticleList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getArticleList()
    },
    deleteArticle(articleID) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: response} = await deleteArticleApi(articleID)
        if (response.code === CODE_SUCCESS) {
          this.$message({
            type: 'success',
            message: '删除文章成功!'
          });
          this.getArticleList()
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
    },
    async topArticle(articleID) {
      const {data: response} = await topArticleApi(articleID)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        this.getArticleList()
      } else {
        this.$message.error(response.message)
      }
    },
    addArticle() {
      this.$router.push('/article/add')
    }
  },
  created() {
    this.getArticleList()
  },
  beforeMount() {
    document.title = '文章列表 | 后台管理 - 卧卷'
  }
}
</script>

<style src="@/assets/css/pagination.css" scoped/>
<style scoped>

.search-bar {
  margin-bottom: 10px;
}

#label-tag {
  margin: 2px 3px;
}

#add-article-btn {
  display: flex;
  justify-content: right;
}

a {
  text-decoration: none;
  color: #606266;
}

.router-link-active {
  text-decoration: none;
  color: #606266;
}

</style>
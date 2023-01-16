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
              prefix-icon="el-icon-search"
              v-model="searchInput">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="searchState" clearable placeholder="请选择文章状态" @change="getArticleList">
            <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="13" id="add-article-btn">
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
          <template slot-scope="scope">
            <router-link :to="{ name: 'editArticle', params: { id: scope.row.id }}">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="15%"
            prop="summary"
            label="摘要">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="12%"
            label="标签">
          <template slot-scope="scope">
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
            min-width="7%"
            prop="type"
            label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === '0'">富文本</el-tag>
            <el-tag v-else>Markdown</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="5%"
            label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === '0'" type="danger">删除</el-tag>
            <el-tag v-else-if="scope.row.state === '1'" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.state === '2'" type="success">发布</el-tag>
            <el-tag v-else type="warning">置顶</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="15%"
            prop="updateTime"
            label="修改时间">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state !== '0'" type="danger" icon="el-icon-delete" size="mini"
                       @click="deleteArticle(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '2'" type="warning" icon="el-icon-top" size="mini"
                       @click="topArticle(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '3'" type="info" icon="el-icon-bottom" size="mini"
                       @click="topArticle(scope.row.id)"></el-button>
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
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/utils/constants";
import {getArticles, deleteArticleApi, topArticleApi} from "@/apis/article_api";

export default {
  name: "ArticleList",
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
      console.log(response)
      if (response.code === 20000) {
        response.data.content.forEach(item => {
          item.labels = item.labels.split('-')
        })
        console.log(response)
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
  }
}
</script>

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
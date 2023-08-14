<template>
  <div>
    <el-card>
      <el-row class="search-bar" :gutter="10">
        <el-col :span="8">
          <el-input
              clearable
              placeholder="请输入想法关键字"
              prefix-icon="el-icon-search"
              @change="getThinkingList"
              v-model="searchInput">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="searchState" clearable placeholder="请选择想法状态" @change="getThinkingList">
            <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" id="add-article-btn">
          <el-button type="primary" @click="addThinking">发布想法</el-button>
        </el-col>
      </el-row>
      <el-table
          border
          :data="thinkingList"
          stripe
          style="width: 100%">
        <el-table-column
            align="center"
            min-width="15%"
            prop="title"
            show-overflow-tooltip
            label="标题">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="25%"
            prop="content"
            show-overflow-tooltip
            label="内容">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="10%"
            label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === '0'" type="danger">删除</el-tag>
            <el-tag v-else type="success">发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            prop="updateTime"
            label="修改时间">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state !== '0'" type="danger" icon="el-icon-delete" size="mini"
                       @click="deleteArticle(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state !== '0'" type="info" icon="el-icon-edit" size="mini"
                       @click="updateThinking(scope.row)"></el-button>
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
    <UpdateThinkingDialog v-show="updateThinkingDialogVisibility" :visibility.sync="updateThinkingDialogVisibility"
                          @onVisibilityChange="handleDialogVisibilityChange"
                          @onUpdateSuccess="getThinkingList"
                          :currentThinking="currentThinking"/>
  </div>
</template>

<script>
import {CODE_SUCCESS} from "@/utils/constants";
import {deleteArticleApi, topArticleApi} from "@/apis/article_api";
import {getThinkingListApi} from "@/apis/thinking_api";
import UpdateThinkingDialog from "@/components/UpdateThinkingDialog";

export default {
  name: "ThinkingList",
  components: {UpdateThinkingDialog},
  data() {
    return {
      currentPage: 1,
      thinkingList: [],
      total: 0,
      currentSize: 10,
      searchInput: '',
      searchState: '',
      stateOptions: [{
        value: '1',
        label: '发布状态'
      },
        {
          value: '0',
          label: '删除状态'
        }],
      currentThinking: {},
      updateThinkingDialogVisibility: false
    }
  },
  methods: {
    async getThinkingList() {
      const {data: response} = await getThinkingListApi(this.currentPage, this.currentSize, this.searchInput, this.searchState)
      if (response.code === CODE_SUCCESS) {
        this.thinkingList = response.data.data
      }
    },
    handleSizeChange(size) {
      this.currentSize = size
      this.getThinkingList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getThinkingList()
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
          // this.getArticleList()
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
        // this.getArticleList()
      } else {
        this.$message.error(response.message)
      }
    },
    addThinking() {
      this.updateThinkingDialogVisibility = true
      this.currentThinking = {}
    },
    updateThinking(data) {
      this.updateThinkingDialogVisibility = true
      this.currentThinking = data
    },
    handleDialogVisibilityChange(visibility) {
      this.updateThinkingDialogVisibility = visibility
    }
  },
  created() {
    this.getThinkingList()
  },
  beforeMount() {
    document.title = '想法列表 | 后台管理 - 卧卷'
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
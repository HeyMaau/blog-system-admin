<template>
  <el-card>
    <el-row class="search-bar">
      <el-col>
        <el-select v-model="searchState" clearable placeholder="请选择评论状态" @change="getCommentList">
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
        :data="commentList"
        stripe
        style="width: 100%">
      <el-table-column
          min-width="25%"
          align="center"
          prop="content"
          label="内容">
      </el-table-column>
      <el-table-column
          min-width="20%"
          align="center"
          prop="articleId"
          label="所属文章ID">
      </el-table-column>
      <el-table-column
          min-width="15%"
          align="center"
          prop="userName"
          label="评论用户名">
      </el-table-column>
      <el-table-column
          min-width="17%"
          align="center"
          prop="updateTime"
          label="更新时间">
      </el-table-column>
      <el-table-column
          min-width="8%"
          align="center"
          prop="state"
          label="状态">
        <template slot-scope="scope">
          <i v-if="scope.row.state != 0" class="el-icon-success"></i>
          <i v-else class="el-icon-error"></i>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="15%"
          label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state !== '0'" type="danger" icon="el-icon-delete" size="mini"
                     @click="deleteComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '1'" type="warning" icon="el-icon-top" size="mini"
                     @click="topComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '2'" type="info" icon="el-icon-bottom" size="mini"
                     @click="topComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '0'" type="success" icon="el-icon-refresh-left" size="mini"
                     @click="recoverComment(scope.row.id)"></el-button>
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
</template>

<script>
import {deleteCommentByState, getCommentsApi, recoverComment, topComment} from "@/apis/comment_api";
import {CODE_SUCCESS} from "@/utils/constants";

export default {
  name: "CommentListComp",
  props: {
    type: String
  },
  data() {
    return {
      currentPage: 1,
      currentSize: 5,
      total: 0,
      commentList: [],
      searchInput: '',
      searchState: '',
      stateOptions: [{
        value: '1',
        label: '正常状态'
      }, {
        value: '2',
        label: '置顶状态'
      }, {
        value: '0',
        label: '删除状态'
      }]
    }
  },
  methods: {
    async getCommentList() {
      const {data: response} = await getCommentsApi(this.currentPage, this.currentSize, this.searchState, this.type)
      if (response.code === 20000) {
        this.commentList = response.data.data
        this.total = response.data.total
      }
    },
    handleSizeChange(size) {
      this.currentSize = size
      this.getCommentList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getCommentList()
    },
    deleteComment(commentID) {
      this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: response} = await deleteCommentByState(commentID)
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '删除评论成功!'
          });
          this.getCommentList()
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
    async recoverComment(commentID) {
      const {data: response} = await recoverComment(commentID)
      if (response.code === CODE_SUCCESS) {
        this.$message.success("恢复评论成功！")
        this.getCommentList()
      } else {
        this.$message.error(response.message)
      }
    },
    async topComment(commentID) {
      const {data: response} = await topComment(commentID)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        this.getCommentList()
      } else {
        this.$message.error(response.message)
      }
    }
  },
  created() {
    this.getCommentList()
  }
}
</script>

<style scoped>

.search-bar {
  margin-bottom: 10px;
  text-align: left;
}

</style>
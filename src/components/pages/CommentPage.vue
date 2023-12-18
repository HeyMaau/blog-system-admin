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
        <template #default="scope">
          <el-icon v-if="scope.row.state !== '0'" :size="20" color="#32CD32">
            <CircleCheckFilled/>
          </el-icon>
          <el-icon v-else :size="20" color="#DC143C">
            <CircleCloseFilled/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="15%"
          label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.state !== '0'" type="danger" :icon="Delete" size="small"
                     @click="deleteComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '1'" type="warning" :icon="Top" size="small"
                     @click="topComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '2'" type="info" :icon="Bottom" size="small"
                     @click="topComment(scope.row.id)"></el-button>
          <el-button v-if="scope.row.state === '0'" type="success" :icon="RefreshLeft" size="small"
                     @click="recoverComment(scope.row.id)"></el-button>
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
</template>

<script>
import {deleteCommentByState, getCommentsApi, recoverComment, topComment} from "@/apis/comment_api";
import {CODE_SUCCESS} from "@/utils/constants";
import {Bottom, Delete, RefreshLeft, Top} from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  name: "CommentListComp",
  computed: {
    zhCn() {
      return zhCn
    },
    RefreshLeft() {
      return RefreshLeft
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

<style src="@/assets/css/pagination.css" scoped/>
<style scoped>

.search-bar {
  margin-bottom: 10px;
  text-align: left;
}

</style>
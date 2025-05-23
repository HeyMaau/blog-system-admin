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
              :prefix-icon="Search"
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
            min-width="20%"
            label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.state === '1'" type="danger" :icon="Delete" size="small"
                       @click="deleteUser(scope.row.id)"></el-button>
            <el-button v-if="scope.row.state === '1'" type="info" :icon="Setting" size="small"
                       @click="showUpdateUserDialog(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-config-provider :locale="zhCn">
        <el-pagination
            class="list-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-config-provider>
    </el-card>
    <el-dialog
        title="修改用户信息"
        v-model="updateUserDialogVisible"
        width="50%">
      <el-form ref="updateCategoryFormRef" :model="user" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="专业领域" prop="major">
          <el-input v-model="user.major"></el-input>
        </el-form-item>
        <el-form-item label="Github" prop="hubSite">
          <el-input v-model="user.hubSite"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="sign">
          <el-input v-model="user.sign"></el-input>
        </el-form-item>
      </el-form>
      <div class="cover-setting-container">
        <div class="cover-setting-title">头像</div>
        <el-upload
            class="avatar-uploader"
            :headers="{'authorization': token}"
            :action="uploadAvatarUrl"
            :show-file-list="false"
            :on-success="handleUploadAvatarSuccess"
            :on-error="handleUploadAvatarError"
            :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <el-icon v-else class="el-icon-plus avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {deleteUser, getUsers, updateUserApi} from "@/apis/user_api";
import {CODE_SUCCESS, URL_IMAGE, URL_UPLOAD_IMAGE} from "@/utils/constants";
import {deepClone} from "@/utils/clone-util";
import {Delete, Search, Setting} from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  name: "UserPage",
  computed: {
    Search() {
      return Search
    },
    zhCn() {
      return zhCn
    },
    Setting() {
      return Setting
    },
    Delete() {
      return Delete
    }
  },
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
      }],
      user: {
        userName: '',
        major: '',
        hubSite: '',
        sign: '',
        avatar: ''
      },
      token: localStorage.getItem('token'),
      updateUserDialogVisible: false,
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        major: [
          {required: true, message: '请输入专业领域', trigger: 'blur'}
        ],
        hubSite: [
          {required: true, message: '请输入Github地址', trigger: 'blur'}
        ],
        sign: [
          {required: true, message: '请输入个性签名', trigger: 'blur'}
        ]
      },
      uploadAvatarUrl: URL_UPLOAD_IMAGE,
      avatarUrl: ''
    }
  },
  methods: {
    async getUserList() {
      const {data: response} = await getUsers(this.searchInput, this.searchState, this.currentPage, this.size)
      if (response.code === 20000) {
        this.userList = response.data.content
        this.total = response.data.totalElements
      }
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
    },
    handleUploadAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
      this.$message.success('上传头像成功')
      this.user.avatar = res.data.image_id
    },
    handleUploadAvatarError() {
      this.$message.error('上传头像失败')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像只能是JPG/PNG格式');
      }
      if (!isLt2M) {
        this.$message.error('上传头像大小不能超过2MB');
      }
      return isJPG && isLt2M;
    },
    showUpdateUserDialog(user) {
      this.updateUserDialogVisible = true
      this.user = deepClone(user)
      if (this.user.avatar !== undefined && this.user.avatar.length !== 0) {
        this.setUserAvatar(this.user.avatar)
      }
    },
    setUserAvatar(avatarID) {
      this.avatarUrl = URL_IMAGE + avatarID
    },
    async updateUser() {
      const {data: response} = await updateUserApi(this.user)
      if (response.code === CODE_SUCCESS) {
        this.$message.success("修改用户信息成功")
        this.updateUserDialogVisible = false
        this.getUserList()
      } else {
        this.$message.error(response.message)
      }
    }
  }
  ,
  created() {
    this.getUserList()
  },
  beforeMount() {
    document.title = '用户管理 | 后台管理 - 卧卷'
  }
}
</script>

<style src="@/assets/css/avatar.css" scoped></style>
<style src="@/assets/css/pagination.css" scoped/>
<style scoped>

.search-bar {
  margin-bottom: 10px;
}

#selector {
  width: auto;
}

</style>
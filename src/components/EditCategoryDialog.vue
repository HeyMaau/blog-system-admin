<script>

import {CODE_SUCCESS, URL_IMAGE, URL_UPLOAD_IMAGE} from "@/utils/constants";
import {addCategory, updateCategory} from "@/apis/category_api";

export default {
  name: "EditCategoryDialog",
  props: {
    category: Object,
    type: String,
    visibility: Boolean
  },
  data() {
    return {
      dialogVisibility: false,
      currentCategory: {
        name: '',
        description: '',
        cover: '',
        tagColor: '#3ddc84'
      },
      token: localStorage.getItem('token'),
      uploadCoverUrl: URL_UPLOAD_IMAGE,
      coverUrl: '',
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入分类描述', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleUploadCoverSuccess(res, file) {
      this.coverUrl = URL.createObjectURL(file.raw);
      this.$message.success('上传封面成功')
      this.currentCategory.cover = res.data.image_id
    },
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传封面只能是JPG/PNG格式');
      }
      if (!isLt2M) {
        this.$message.error('上传封面大小不能超过2MB');
      }
      return isJPG && isLt2M;
    },
    handleUploadCoverError() {
      this.$message.error('上传封面失败')
    },
    async confirm() {
      let lowercaseType = this.type.toLowerCase()
      if (lowercaseType === 'add') {
        const {data: response} = await addCategory(this.currentCategory)
        if (response.code === CODE_SUCCESS) {
          this.$message.success("添加分类成功")
          this.$emit('onSuccess')
        } else {
          this.$message.error(response.message)
        }
      } else {
        const {data: response} = await updateCategory(this.currentCategory)
        if (response.code === CODE_SUCCESS) {
          this.$message.success("更新分类成功")
          this.$emit('onSuccess')
        } else {
          this.$message.error(response.message)
        }
      }
    },
    cancel() {
      this.$emit('onCancel')
    }
  },
  watch: {
    visibility(newValue) {
      this.dialogVisibility = newValue
    },
    dialogVisibility(newValue) {
      this.$emit('update:visibility', newValue)
    },
    category: {
      handler(newValue) {
        this.currentCategory = newValue
        this.coverUrl = this.currentCategory.cover.trim().length === 0 ? '' : URL_IMAGE + this.currentCategory.cover
        if (this.currentCategory.tagColor === null || this.currentCategory.tagColor.length === 0) {
          this.currentCategory.tagColor = '#3ddc84'
        }
      },
      deep: true
    }
  }
}
</script>

<template>
  <el-dialog
      :title="type.toLowerCase() === 'add' ? '添加分类' : '修改分类'"
      v-model="dialogVisibility"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%">
    <el-form ref="addCategoryFormRef" :model="currentCategory" label-width="80px" :rules="rules">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="currentCategory.name"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input v-model="currentCategory.description"></el-input>
      </el-form-item>
    </el-form>
    <div class="cover-setting-container">
      <div class="cover-setting-title">分类封面</div>
      <el-upload
          class="avatar-uploader"
          :headers="{'authorization': token}"
          :action="uploadCoverUrl"
          :show-file-list="false"
          :on-success="handleUploadCoverSuccess"
          :on-error="handleUploadCoverError"
          :before-upload="beforeCoverUpload">
        <img v-if="coverUrl" :src="coverUrl" class="avatar">
        <el-icon v-else class="el-icon-plus avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </div>
    <div class="tag-color-container">
      <span class="cover-setting-title">标签颜色</span>
      <el-color-picker v-model="currentCategory.tagColor"></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style src="@/assets/css/avatar.css" scoped></style>
<style scoped>

:deep( .el-dialog__header) {
  text-align: left;
}

:deep( .el-dialog__body) {
  text-align: left;
}

.tag-color-container {
  display: flex;
  align-items: center;
}

</style>
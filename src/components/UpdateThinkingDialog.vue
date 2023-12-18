<template>
  <div>
    <el-dialog v-model="editDialogVisibility" :close-on-click-modal="false" :close-on-press-escape="false"
               @open="handleOpenEditDialog"
               @close="handleCloseEditDialog"
               class="dialog-container add-thinking-dialog">
      <div class="content-container">
        <div class="picture-area" v-show="pictureList.length !== 0">
          <div class="thinking-picture-container" v-for="item in pictureList" :key="item">
            <img :src="`${pictureBaseUrl}${item}`" class="thinking-picture"/>
          </div>
        </div>
        <div class="input-area">
        <textarea v-model="thinking.title" placeholder="请输入标题（选填）" rows="1" class="input-title"
                  ref="inputTitleRef"/>
          <textarea v-model="thinking.content" placeholder="请输入想法内容" class="input-content"
                    ref="inputContentRef"/>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-footer-button-container">
          <el-icon :size="25" @click="openUploadPictureDialog">
            <Picture/>
          </el-icon>
          <el-button type="primary" :disabled="addButtonAble" @click="updateThinking" class="add-button">
            发布
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!--上传图片弹窗-->
    <el-dialog v-model="uploadPicDialogVisibility" title="上传图片" :close-on-click-modal="false"
               :close-on-press-escape="false"
               destroy-on-close
               class="dialog-container upload-picture-dialog">
      <el-upload
          :action="uploadPictureUrl"
          :headers="{Authorization: token}"
          list-type="picture-card"
          :file-list="pictureFileList"
          :before-upload="beforePictureUpload"
          :on-success="handlePictureUploadSuccess"
          :on-error="handlePictureUploadError"
          :on-remove="handlePictureRemove">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-footer-button-container">
          <div>已插入{{ tempPictureList.length }}张图片</div>
          <el-button type="primary" @click="handleUploadPicture">保存图片</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {CODE_SUCCESS, URL_IMAGE} from "@/utils/constants";
import {deepClone} from "@/utils/clone-util";
import {addThinkingApi, updateThinkingApi} from "@/apis/thinking_api";

export default {
  name: "UpdateThinkingDialog",
  props: {
    visibility: Boolean,
    currentThinking: Object
  },
  data() {
    return {
      uploadPictureUrl: URL_IMAGE + 'watermark',
      token: sessionStorage.getItem('token'),
      editDialogVisibility: false,
      uploadPicDialogVisibility: false,
      pictureList: [],
      tempPictureList: [],
      pictureFileList: [],
      confirmUpload: false,
      thinking: {},
      addButtonAble: false,
      pictureBaseUrl: URL_IMAGE
    }
  },
  watch: {
    visibility(newValue) {
      this.editDialogVisibility = newValue
    },
    editDialogVisibility(newValue) {
      this.$emit('onVisibilityChange', newValue)
    },
    currentThinking(newValue) {
      this.thinking = deepClone(newValue)
      this.pictureFileList = []
      this.pictureList = []
      this.tempPictureList = []
      if (newValue.images !== undefined && newValue.images.length !== 0) {
        this.pictureList = newValue.images.split('-')
        this.pictureList.forEach(value => {
          this.pictureFileList.push({
            name: value,
            url: this.pictureBaseUrl + value
          })
        })
      }
    },
    thinking: {
      handler() {
        if (this.thinking.content !== undefined) {
          this.addButtonAble = this.thinking.content.trim().length === 0
        }
      },
      deep: true
    }
  },
  methods: {
    adjustInputTitleHeight(ev) {
      this.$refs.inputTitleRef.style.height = 'inherit'
      this.$refs.inputTitleRef.style.height = ev.target.scrollHeight + 'px'
    },
    adjustInputContentHeight(ev) {
      this.$refs.inputContentRef.style.height = 'inherit'
      this.$refs.inputContentRef.style.height = ev.target.scrollHeight + 'px'
    },
    openUploadPictureDialog() {
      this.confirmUpload = false
      this.uploadPicDialogVisibility = true
      Object.assign(this.tempPictureList, this.pictureList)
    },
    // eslint-disable-next-line no-unused-vars
    handlePictureUploadSuccess(response, file, fileList) {
      if (response.code === CODE_SUCCESS) {
        this.tempPictureList.push(response.data.image_id)
      }
    },
    // eslint-disable-next-line no-unused-vars
    handlePictureUploadError(err, file, fileList) {
      this.$message.error("上传图片失败，请稍后重试")
    },
    // eslint-disable-next-line no-unused-vars
    handlePictureRemove(file, fileList) {
      if (file.response !== undefined) {
        let index = this.tempPictureList.indexOf(file.response.data.image_id);
        this.tempPictureList.splice(index, 1)
      } else {
        let index = this.tempPictureList.indexOf(file.name);
        this.tempPictureList.splice(index, 1)
      }
    },
    handleUploadPicture() {
      this.uploadPicDialogVisibility = false
      this.confirmUpload = true
      this.pictureList = this.tempPictureList
      this.thinking.images = this.pictureList.join('-')
    },
    beforePictureUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isTypeCorrect = isJPEG || isJPG || isPNG
      if (!isTypeCorrect) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isTypeCorrect && isLt2M;
    },
    handleOpenEditDialog() {
      this.$nextTick(() => {
        this.$refs.inputTitleRef.addEventListener('input', this.adjustInputTitleHeight)
        this.$refs.inputContentRef.addEventListener('input', this.adjustInputContentHeight)
      })
    },
    handleCloseEditDialog() {
      this.$refs.inputTitleRef.removeEventListener('input', this.adjustInputTitleHeight)
      this.$refs.inputContentRef.removeEventListener('input', this.adjustInputContentHeight)
    },
    async updateThinking() {
      if (this.thinking.state === undefined) {
        const {data: response} = await addThinkingApi(this.thinking)
        this.afterUpdateThinking(response, false)
      } else {
        const {data: response} = await updateThinkingApi(this.thinking)
        this.afterUpdateThinking(response, true)
      }
    },
    afterUpdateThinking(response, isUpdate) {
      if (response.code === CODE_SUCCESS) {
        this.$message.success(isUpdate ? '修改想法成功' : '发布想法成功')
        this.editDialogVisibility = false
        this.$emit('onUpdateSuccess')
      } else {
        this.$message.error(isUpdate ? '修改想法失败，请稍后再试' : '发布想法失败，请稍后再试')
      }
    }
  }
}
</script>

<style scoped>

.dialog-container {
}

.content-container {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
  padding: 16px 16px 0;
}

.input-area {

}

textarea {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  outline: none;
  resize: none;
  border: none;
  width: 100%;
  padding: 0;
}

textarea::-webkit-input-placeholder {
  color: rgb(191, 191, 191);
}

.input-title {
  min-height: 24px;
  line-height: 24px;
  overflow: hidden;
  color: rgb(18, 18, 18);
  font-size: 14px;
}

.input-content {
  width: 100%;
  padding: 0;
  min-height: 200px;
  color: rgb(68, 68, 68);
  font-size: 16px;
  overflow: hidden;
}

:deep(.el-dialog__body) {
  padding-bottom: 15px;
}

.upload-picture-button {
  font-size: 25px;
  color: rgb(68, 68, 68);
  margin-right: 30px;
}

.add-button {
  line-height: 0.5;
}

.dialog-footer-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

:deep(.upload-picture-dialog) {
  text-align: left;
}

:deep( .upload-picture-dialog .el-dialog__title::after) {
  background-color: rgb(5, 109, 232);
  height: 4px;
  width: 70px;
  content: "";
  display: block;
  position: absolute;
  top: 50px;
}

.picture-area {
  display: flex;
  margin-left: -8px;
  margin-bottom: 16px;
}

.thinking-picture-container {
  box-sizing: border-box;
  margin: 8px 0 0 8px;
  width: 86px;
  height: 86px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;

}

.thinking-picture {
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
}

</style>
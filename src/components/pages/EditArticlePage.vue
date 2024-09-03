<template>
  <div id="container" ref="pageContainerRef">
    <label id="input-container">
      <textarea id="input-area" placeholder="请输入标题" rows="1" ref="inputAreaRef" v-model="article.title"></textarea>
    </label>
    <div class="editor-save-button-container">
      <RtEditor v-model="article.content"/>
      <div class="save-button-container" ref="saveButtonContainerRef">
        <div class="save-button" @click="saveArticle">
          <svg ref="refreshIconRef" t="1686294507516" class="icon refresh-icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="3374" width="64" height="64">
            <path
                d="M929.8 353.9c-5.5-14.5-21.6-21.8-36.1-16.4-14.5 5.5-21.8 21.6-16.3 36.1 36.8 97.8 33.4 204-9.6 299.2-43.2 95.2-120.7 167.9-218.5 204.8-97.8 36.8-204 33.4-299.2-9.6-33.6-15.2-64.8-35.2-92.7-59.1 22.4 0.6 46.9-0.5 72.1-5 15.2-2.7 25.4-17.3 22.7-32.5-2.7-15.2-17.3-25.4-32.5-22.7-50.8 9-99.2 2.1-126.5-3.8-9.2-4.2-20.4-3.4-29 3.3-3.4 2.6-5.9 5.9-7.7 9.5-0.2 0.4-0.3 0.8-0.5 1.2-0.6 1.3-1.1 2.5-1.4 3.9-1.6 5.3-1.9 11-0.2 16.5 7.2 23.1 24.2 92.3 17.4 134.7-2.5 15.3 7.9 29.7 23.2 32.2 1.5 0.2 3 0.4 4.5 0.4 13.5 0 25.4-9.8 27.6-23.6 3.3-20.5 2.6-43.8 0.2-66.2 30.3 24.9 63.9 46.1 99.8 62.3 58.8 26.6 121.4 40 184.1 40 53.2 0 106.6-9.6 158-29C780.9 887.9 869.5 804.8 918.8 696c49.2-108.8 53.1-230.3 11-342.1zM155 350.5c88.9-196.5 321.1-284 517.5-195.1 32.8 14.8 62.6 33.7 89.6 56.2-22.4-0.6-46.8 0.5-72 5-15.2 2.7-25.4 17.2-22.7 32.5 2.7 15.3 17.3 25.4 32.5 22.7 54.5-9.6 106.3-1 132.3 5.1 0.4 0.1 0.8 0.1 1.2 0.1 1.3 0.3 2.6 0.4 4 0.5 0.4 0 0.8 0.1 1.1 0.1 0.3 0 0.6-0.1 0.9-0.1 1.1 0 2.3-0.2 3.4-0.3 0.7-0.1 1.4-0.2 2.1-0.4 1.1-0.3 2.2-0.6 3.2-1 0.7-0.3 1.4-0.5 2.1-0.8 1-0.4 1.9-1 2.8-1.6 0.7-0.4 1.5-0.9 2.2-1.4 0.2-0.2 0.5-0.3 0.7-0.5 0.6-0.5 1.1-1 1.6-1.6 0.5-0.4 1-0.8 1.4-1.2 0.1-0.2 0.2-0.4 0.4-0.5 1.5-1.7 2.8-3.5 3.8-5.4l0.3-0.6c0.9-1.7 1.5-3.6 2-5.5 0.2-0.6 0.3-1.3 0.4-1.9 0.3-1.6 0.4-3.3 0.5-5v-1.6c-0.1-2.2-0.5-4.4-1.1-6.5v-0.3c-7.2-23-24.3-92.2-17.4-134.7 2.5-15.3-7.9-29.7-23.2-32.2-15.2-2.5-29.7 7.9-32.2 23.2-3.3 20.5-2.6 43.8-0.2 66.3-29.3-23.7-61.6-43.7-96.7-59.6C471 2.6 205.6 102.7 104 327.3 54.7 436.2 50.8 557.7 93 669.5c4.2 11.2 14.9 18.2 26.2 18.2 3.3 0 6.6-0.6 9.9-1.8 14.5-5.5 21.8-21.6 16.3-36.1-36.8-97.9-33.4-204.2 9.6-299.3z"
                fill="#4F4F4F" p-id="3375"></path>
            <path
                d="M417.4 835.5c30.8 9 62.1 13.3 93.1 13.3 129.5 0 252.6-75.5 308.1-198.1 37.1-82 40-173.6 8.3-257.9-3.7-9.7-14.4-14.5-24.1-10.9-9.7 3.6-14.5 14.4-10.9 24.1 28.2 74.9 25.6 156.4-7.4 229.3C723.3 770.4 570 841 427.8 799.6c-9.9-2.9-20.3 2.8-23.2 12.7-2.8 9.9 2.9 20.3 12.8 23.2zM589.6 222.3c10 2.7 20.2-3.2 22.9-13.1 2.7-10-3.2-20.2-13.1-22.9-160.4-43.7-326.6 34.8-395.2 186.4-37.1 82.1-40.1 173.7-8.2 257.9 2.8 7.5 9.9 12.1 17.5 12.1 2.2 0 4.4-0.4 6.6-1.2 9.6-3.6 14.5-14.5 10.9-24.1-28.3-74.9-25.7-156.4 7.3-229.3 61-134.8 208.8-204.5 351.3-165.8z"
                fill="#4F4F4F" p-id="3376"></path>
          </svg>
          保存
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div id="setting-container">
      <div id="publish-setting-title">发布设置</div>
      <div id="setting-item-container">
        <el-row class="setting-item">
          <el-col :span="3" class="setting-item-title">文章封面</el-col>
          <el-col :span="8">
            <el-upload
                :headers="{'authorization': token}"
                accept=".jpg,.jpeg,.png,.webp"
                class="avatar-uploader"
                :action="uploadImagePath"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeCoverUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"> 添加文章封面</i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row class="setting-item" type="flex" align="middle">
          <el-col :span="3" class="setting-item-title">文章分类</el-col>
          <el-col :span="8">
            <el-select v-model="article.categoryId" placeholder="请选择文章分类">
              <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="setting-item" type="flex" align="middle">
          <el-col :span="3" class="setting-item-title">文章标签</el-col>
          <el-col :span="21">
            <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="operation-container">
      <el-button size="large" type="primary" @click="addArticle('2', false)" v-if="articleState !== '2'">发布文章</el-button>
      <el-button size="large" type="info" @click="addArticle('1', false)" v-if="articleState !== '2'">保存文章</el-button>
      <el-button size="large" type="primary" @click="updateArticle(false)" v-if="articleState === '2'">修改文章</el-button>
    </div>
  </div>
</template>

<script>
import RtEditor from "@/components/RtEditor.vue";
import {getCategoriesApi} from "@/apis/category_api";
import {CODE_SUCCESS, URL_IMAGE} from "@/utils/constants";
import {addArticleApi, getArticleApi, updateArticleApi} from "@/apis/article_api";

export default {
  name: "EditArticle",
  components: {
    RtEditor
  },
  data() {
    return {
      article: {
        categoryId: '',
        content: '',
        cover: '',
        id: '',
        labels: '',
        state: '',
        summary: '',
        title: '',
        type: '0',
      },
      articleState: '',
      imageUrl: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      categoryList: [],
      uploadImagePath: URL_IMAGE,
      token: localStorage.getItem('token'),
      observer: null
    }
  },
  methods: {
    async getCategories() {
      const page = 1
      const size = 10
      const {data: response} = await getCategoriesApi(page, size)
      if (response.code === CODE_SUCCESS) {
        this.categoryList = response.data.content
      } else {
        this.$message.error(response.message)
      }
    },
    async getArticle(articleID) {
      const {data: response} = await getArticleApi(articleID)
      if (response.code === CODE_SUCCESS) {
        this.article = response.data
        if (response.data.cover.length !== 0) {
          this.imageUrl = URL_IMAGE + response.data.cover
          this.oldImageID = response.data.cover
        }
        this.dynamicTags = response.data.labels.split('-')
        this.articleState = response.data.state
      } else {
        this.$message.error(response.message)
      }
    },
    adjustTextareaHeight(ev) {
      this.$refs.inputAreaRef.style.height = 'inherit'
      this.$refs.inputAreaRef.style.height = ev.target.scrollHeight + 'px'
    },
    handleCoverSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.article.cover = res.data.image_id
      this.oldImageID = res.data.image_id
    },
    beforeCoverUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isWEBP = file.type === 'image/webp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isTypeCorrect = isJPEG || isJPG || isPNG || isWEBP
      if (!isTypeCorrect) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isTypeCorrect && isLt2M;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    /**
     * 发布/保存文章
     * @param state '1'表示草稿，'2'表示发布
     * @param justSave 仅用于中途保存文章
     * @returns {Promise<void>}
     */
    async addArticle(state, justSave) {
      let previousState = this.article.state
      this.article.labels = this.dynamicTags.join('-')
      this.article.state = state
      const {data: response} = await addArticleApi(this.article)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        if (justSave) {
          this.$refs.refreshIconRef.style.animationPlayState = 'paused'
        } else {
          this.$router.push('/article')
        }
      } else {
        this.$message.error(response.message)
        this.article.state = previousState
      }
    },
    async updateArticle(justSave) {
      this.article.labels = this.dynamicTags.join('-')
      const {data: response} = await updateArticleApi(this.article)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        if (justSave) {
          this.$refs.refreshIconRef.style.animationPlayState = 'paused'
        } else {
          this.$router.push('/article')
        }
      } else {
        this.$message.error(response.message)
      }
    },
    /**
     * 保存文章 根据文章状态自动判断API
     */
    saveArticle() {
      this.$refs.refreshIconRef.style.animationPlayState = 'running'
      if (this.articleState === '2') {
        this.updateArticle(true)
      } else {
        this.addArticle(this.articleState, true)
      }
    },
    adjustSaveButtonContainerHeight(containerHeight) {
      this.$refs.saveButtonContainerRef.style.height = containerHeight + 'px'
    }
  },
  mounted() {
    this.$refs.inputAreaRef.addEventListener('input', this.adjustTextareaHeight)
    this.observer = new ResizeObserver(entries => {
      this.adjustSaveButtonContainerHeight(entries[0].contentRect.height)
    })
    this.observer.observe(this.$refs.pageContainerRef)
  },
  beforeUnmount() {
    this.$refs.inputAreaRef.removeEventListener('input', this.adjustTextareaHeight)
    this.observer.disconnect()
  },
  created() {
    this.getCategories()
    const articleID = this.$route.params.id
    if (articleID.indexOf('add') === -1) {
      this.getArticle(articleID)
    }
  },
  beforeMount() {
    document.title = '编辑文章 - 卧卷'
  }
}
</script>

<style scoped>

#container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tinymce-editor {
  width: 1000px;
}

#input-container {
  width: 1000px;
  margin: 16px 0;
  height: auto;
}

#input-area {
  width: 100%;
  border: none;
  min-height: 45px;
  font-size: 32px;
  line-height: 1.4;
  resize: none;
  outline: none;
  padding: 0;
  font-weight: 600;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

:deep( .tox-tinymce) {
  border-radius: 5px;
}

#publish-setting-title {
  color: #444444;
  font-size: 17px;
  font-weight: 500;
}

.setting-item-title {
  color: #444444;
  font-size: 15px;
  font-weight: 400;
}

#setting-container {
  width: 1000px;
}

#setting-item-container {
  margin-left: 20px;
}

:deep( .avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

:deep( .avatar-uploader .el-upload:hover) {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 150px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 100px;
  display: block;
}

.setting-item {
  margin-top: 20px;
}

.el-tag {
  margin-right: 10px;
}

.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}

.el-divider {
  width: 1000px;
}

#operation-container {
  margin-top: 20px;
  width: 1000px;
  display: flex;
  justify-content: flex-end;
}

.editor-save-button-container {
  position: relative;
}

.save-button-container {
  position: absolute;
  right: -100px;
  top: 0;
  height: 500px;
}

.save-button {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 64px;
  width: 64px;
  padding: 5px;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-icon {
  animation: save-button-rotate 3s linear infinite;
  -webkit-animation: save-button-rotate 3s linear infinite;
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

@keyframes save-button-rotate {
  0% {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

@-webkit-keyframes save-button-rotate {
  0% {
    -webkit-transform: rotate(0deg)
  }
  50% {
    -webkit-transform: rotate(180deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  }
}

</style>
<template>
  <div id="container">
    <label id="input-container">
      <textarea id="input-area" placeholder="请输入标题" rows="1" ref="inputAreaRef" v-model="article.title"></textarea>
    </label>
    <RtEditor v-model="article.content"/>
    <el-divider></el-divider>
    <div id="setting-container">
      <div id="publish-setting-title">发布设置</div>
      <div id="setting-item-container">
        <el-row class="setting-item">
          <el-col :span="3" class="setting-item-title">文章封面</el-col>
          <el-col :span="8">
            <el-upload
                :with-credentials="true"
                accept=".jpg,.jpeg,.png"
                class="avatar-uploader"
                action="http://localhost:8080/admin/image"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeCoverUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" crossorigin="use-credentials">
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
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="operation-container">
      <el-button type="primary" @click="addArticle('2')" v-if="article.state !== '2'">发布文章</el-button>
      <el-button type="info" @click="addArticle('1')" v-if="article.state !== '2'">保存文章</el-button>
      <el-button type="primary" @click="updateArticle" v-if="article.state === '2'">修改文章</el-button>
    </div>
  </div>
</template>

<script>
import RtEditor from "@/components/RtEditor";
import {getCategoriesApi} from "@/apis/category_api";
import {CODE_SUCCESS, URL_GET_IMAGE} from "@/utils/constants";
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
      imageUrl: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      categoryList: [],
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
        this.imageUrl = URL_GET_IMAGE + response.data.cover
        this.dynamicTags = response.data.labels.split('-')
      } else {
        this.$message.error(response.message)
      }
    },
    adjustTextareaHeight(ev) {
      this.$refs.inputAreaRef.style.height = ev.target.scrollHeight + 'px'
    },
    handleCoverSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.article.cover = res.data.image_id
    },
    beforeCoverUpload(file) {
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
     * @returns {Promise<void>}
     */
    async addArticle(state) {
      this.article.labels = this.dynamicTags.join('-')
      this.article.state = state
      const {data: response} = await addArticleApi(this.article)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        this.$router.push('/article')
      } else {
        this.$message.error(response.message)
      }
    },
    async updateArticle() {
      const {data: response} = await updateArticleApi(this.article)
      if (response.code === CODE_SUCCESS) {
        this.$message.success(response.message)
        this.$router.push('/article')
      } else {
        this.$message.error(response.message)
      }
    }
  },
  mounted() {
    this.$refs.inputAreaRef.addEventListener('input', this.adjustTextareaHeight)
  },
  beforeDestroy() {
    this.$refs.inputAreaRef.removeEventListener('input', this.adjustTextareaHeight)
  },
  created() {
    this.getCategories()
    const articleID = this.$route.params.id
    if (articleID.indexOf('add') === -1) {
      this.getArticle(articleID)
    }
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

::v-deep .tox-tinymce {
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

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
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

</style>
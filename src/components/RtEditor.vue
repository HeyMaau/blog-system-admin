<template>
  <div class="tinymce-editor">
    <Editor
        :id="tinymceId"
        :init="init"
        :disabled="disabled"
        v-model="myValue"
        @onClick="onClick"
    ></Editor>
  </div>
</template>

<script>
// import axios from "axios";
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue' //编辑器引入
import 'tinymce/themes/silver/theme' //编辑器主题
import 'tinymce/icons/default' //引入编辑器图标icon，不引入则不显示对应图标
// 引入编辑器插件（基本免费插件都在这儿了）
import 'tinymce/plugins/advlist' //高级列表
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/image' //插入编辑图片
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/wordcount' // 字数统计
import 'tinymce/plugins/codesample' // 代码块
import 'tinymce/plugins/table' // 表格
import 'tinymce/plugins/autoresize' // 自适应尺寸
import {uploadImageWithWatermark} from "@/apis/image_api";
import {CODE_SUCCESS, URL_IMAGE} from "@/utils/constants";

const fonts = [
  "宋体=宋体",
  "微软雅黑=微软雅黑",
  "新宋体=新宋体",
  "黑体=黑体",
  "楷体=楷体",
  "隶书=隶书",
  "Courier New=courier new,courier",
  "AkrutiKndPadmini=Akpdmi-n",
  "Andale Mono=andale mono,times",
  "Arial=arial,helvetica,sans-serif",
  "Arial Black=arial black,avant garde",
  "Book Antiqua=book antiqua,palatino",
  "Comic Sans MS=comic sans ms,sans-serif",
  "Courier New=courier new,courier",
  "Georgia=georgia,palatino",
  "Helvetica=helvetica",
  "Impact=impact,chicago",
  "Symbol=symbol",
  "Tahoma=tahoma,arial,helvetica,sans-serif",
  "Terminal=terminal,monaco",
  "Times New Roman=times new roman,times",
  "Trebuchet MS=trebuchet ms,geneva",
  "Verdana=verdana,geneva",
  "Webdings=webdings",
  "Wingdings=wingdings,zapf dingbats"
];

export default {
  name: "RtEditor",
  components: {
    Editor
  },
  props: {
    //内容
    modelValue: {
      type: String,
      default: ''
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //插件
    plugins: {
      type: [String, Array],
      default: 'advlist autolink link image lists charmap media wordcount codesample table autoresize'
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      //初始化配置
      tinymceId: 'tinymce',
      myValue: this.value,
      publicPath: import.meta.env.BASE_URL,
      init: {
        selector: '#tinymce',
        language_url: import.meta.env.BASE_URL + 'tinymce/langs/zh_CN.js',//汉化路径是自定义的，一般放在public或static里面
        language: 'zh_CN',
        skin_url: import.meta.env.BASE_URL + 'tinymce/skins/ui/oxide',//皮肤
        content_css: import.meta.env.BASE_URL + 'tinymce/skins/content/default/content.css',//自己的static中路径
        content_style: 'img {max-width:100%;}',//限制图片大小
        plugins: this.plugins,//插件
        //工具栏
        toolbar: ['undo redo | formatselect | bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify | lineheight bullist numlist outdent indent table | codesample image media',
          'styleselect | fontsizeselect | fontselect | forecolor backcolor | blockquote subscript superscript removeformat'],
        toolbar_location: '/',
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px',  //字体大小
        font_formats: fonts.join(";"),
        min_height: 500,//高度
        autoresize_bottom_margin: 20,
        placeholder: '正文内容',
        branding: true,//隐藏右下角技术支持
        toolbar_sticky: true,
        //图片上传
        images_upload_handler: async (blobInfo, success, failure) => {
          if (blobInfo.blob().size / 1024 / 1024 > 2) {
            failure("上传失败，图片大小请控制在 2M 以内")
          } else {
            let formData = new FormData()
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            const {data: response} = await uploadImageWithWatermark(formData)
            if (response.code === CODE_SUCCESS) {
              const imageUrl = URL_IMAGE + response.data.image_id
              success(imageUrl)
            } else {
              failure(response.message)
            }
          }
        },
        codesample_languages: [
          {text: 'HTML/XML', value: 'html'},
          {text: 'JavaScript', value: 'javascript'},
          {text: 'CSS', value: 'css'},
          {text: 'PHP', value: 'php'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'Python', value: 'python'},
          {text: 'Java', value: 'java'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'csharp'},
          {text: 'C++', value: 'cpp'}
        ]
      }
    }
  },
  watch: {
    //监听内容变化
    modelValue(newValue) {
      this.myValue = (newValue == null ? '' : newValue)
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  }
}
</script>

<style scoped>

</style>
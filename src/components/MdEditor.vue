<template>
  <div id="vditor"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import Vditor from 'vditor';
import {BlogImage} from "../pojo/BlogImage.ts";
import {CODE_SUCCESS} from "../utils/constants";
import {ElMessage} from "element-plus";

const vditor = ref<Vditor | null>(null);

// eslint-disable-next-line no-undef
const model = defineModel<string>()

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    minHeight: 500,
    placeholder: "请随便写吧",
    counter: {
      enable: true
    },
    cache: {
      enable: false
    },
    toolbarConfig: {
      pin: true
    },
    after() {
      watch(model, value => {
        if (value != null) {
          vditor?.value?.setValue(value)
        }
      }, {
        immediate: true
      })
    },
    input(value: string) {
      model.value = value;
    },
    upload: {
      url: import.meta.env.VITE_SERVER_PATH + '/image/watermark',
      accept: 'image/*',
      multiple: false,
      max: 2 * 1024 * 1024,
      fieldName: 'file',
      headers: {
        'Authorization': localStorage.getItem('token') || ''
      },
      format(files: File[], responseText: string): string {
        let response: BlogImage = JSON.parse(responseText);
        let fileName = files[0].name;
        if (response.success && response.code === CODE_SUCCESS) {
          ElMessage.success('上传图片成功')
          return JSON.stringify({
            "msg": "",
            "code": 0,
            "data": {
              "errFiles": [],
              "succMap": {
                [fileName]: response.data.image_url
              }
            }
          })
        } else {
          ElMessage.error('上传图片失败')
          return ''
        }
      }
    }
  });
});

</script>

<style scoped></style>
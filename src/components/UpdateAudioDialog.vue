<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {BlogAudio} from "@/pojo/BlogAudio.ts";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {addAudioApi, updateAudioApi} from "@/apis/audio_api.ts";
import {CODE_SUCCESS} from "@/utils/constants.js";
import {deepClone} from "@/utils/clone-util.js";

const props = defineProps({
  visibility: Boolean,
  data: Object
})

const emits = defineEmits(['onDialogClose', 'onUpdateSuccess'])

const dialogVisible = ref(false)
watch(() => props.visibility, value => dialogVisible.value = value)

interface RuleForm {
  name: string,
  artist: string,
  album: string,
  audioUrl: string,
  coverUrl: string,
  audioOrder: number
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {required: true, message: '请输入音频名称', trigger: 'blur'}
  ],
  artist: [
    {required: true, message: '请输入艺术家', trigger: 'blur'}
  ],
  album: [
    {required: true, message: '请输入专辑', trigger: 'blur'}
  ],
  audioUrl: [
    {required: true, message: '请输入音频Url', trigger: 'blur'}
  ],
  coverUrl: [
    {required: true, message: '请输入封面Url', trigger: 'blur'}
  ],
  audioOrder: [
    {required: true, message: '请输入顺序', trigger: ['blur', 'change'], type: 'number'}
  ]
})

const dialogTitle = ref('添加音频')
const audioData = ref<BlogAudio>({})
watch(() => props.data, value => {
  audioData.value = deepClone(value)
  if (value!.id !== undefined && value!.id !== null) {
    dialogTitle.value = '修改音频'
  } else {
    dialogTitle.value = '添加音频'
  }
})

const formRef = ref<FormInstance>()

function updateAudio(): void {
  formRef.value?.validate(isValid => {
    if (!isValid) {
      ElMessage.error('请输入正确的音频数据')
      return
    }
  })
  if (audioData.value.id === undefined || audioData.value.id === null) {
    addAudioApi(audioData.value).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        updateSuccess('添加音频成功')
      } else {
        ElMessage.error(response.data.message)
      }
    })
  } else {
    updateAudioApi(audioData.value).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        updateSuccess('修改音频成功')
      } else {
        ElMessage.error(response.data.message)
      }
    })
  }
}

function updateSuccess(msg: string): void {
  ElMessage.success(msg)
  closeDialog()
  emits('onUpdateSuccess')
}

function closeDialog(): void {
  dialogVisible.value = false
  emits('onDialogClose')
}

</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeDialog"
      width="50%">
    <el-form
        :model="audioData"
        :rules="rules"
        ref="formRef"
        status-icon>
      <el-form-item label="音频名称" prop="name">
        <el-input v-model="audioData.name"/>
      </el-form-item>
      <el-form-item label="艺术家" prop="artist">
        <el-input v-model="audioData.artist"/>
      </el-form-item>
      <el-form-item label="专辑" prop="album">
        <el-input v-model="audioData.album"/>
      </el-form-item>
      <el-form-item label="音频Url" prop="audioUrl">
        <el-input v-model="audioData.audioUrl"/>
      </el-form-item>
      <el-form-item label="封面Url" prop="coverUrl">
        <el-input v-model="audioData.coverUrl"/>
      </el-form-item>
      <el-form-item label="顺序" prop="audioOrder">
        <el-input-number v-model="audioData.audioOrder" :min="0" :max="9"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="updateAudio">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
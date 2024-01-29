<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {CODE_SUCCESS} from "../utils/constants.js";
import {deepClone} from "../utils/clone-util.js";
import {BlogFriendLink} from "../pojo/BlogFriendLink.ts";
import {addFriendLinkApi, updateFriendLinkApi} from "../apis/friend_link_api.ts";

const props = defineProps({
  visibility: Boolean,
  data: Object
})

const emits = defineEmits(['onDialogClose', 'onUpdateSuccess'])

const dialogVisible = ref(false)
watch(() => props.visibility, value => dialogVisible.value = value)

interface RuleForm {
  name: string,
  logo: string,
  url: string,
  linkOrder: number
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {required: true, message: '请输入友情链接名称', trigger: 'blur'}
  ],
  url: [
    {required: true, message: '请输入友情链接地址', trigger: 'blur'}
  ],
  linkOrder: [
    {required: true, message: '请输入顺序', trigger: ['blur', 'change'], type: 'number'}
  ]
})

const dialogTitle = ref('添加友情链接')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const friendLinkData = ref<BlogFriendLink>({})
watch(() => props.data, value => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  friendLinkData.value = deepClone(value)
  if (value!.id !== undefined && value!.id !== null) {
    dialogTitle.value = '修改友情链接'
  } else {
    dialogTitle.value = '添加友情链接'
  }
})

const formRef = ref<FormInstance>()

function updateFriendLink(): void {
  formRef.value?.validate(isValid => {
    if (!isValid) {
      ElMessage.error('请输入正确的友情链接数据')
      return
    }
  })
  if (friendLinkData.value.id === undefined || friendLinkData.value.id === null) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    addFriendLinkApi(friendLinkData.value).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        updateSuccess('添加友情链接成功')
      } else {
        ElMessage.error(response.data.message)
      }
    })
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    updateFriendLinkApi(friendLinkData.value).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        updateSuccess('修改友情链接信息成功')
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
        :model="friendLinkData"
        :rules="rules"
        ref="formRef"
        status-icon>
      <el-form-item label="友情链接名称" prop="name">
        <el-input v-model="friendLinkData.name"/>
      </el-form-item>
      <el-form-item label="友情链接地址" prop="url">
        <el-input v-model="friendLinkData.url"/>
      </el-form-item>
      <el-form-item label="友情链接Logo">
        <el-input v-model="friendLinkData.logo"/>
      </el-form-item>
      <el-form-item label="顺序" prop="linkOrder">
        <el-input-number v-model="friendLinkData.linkOrder" :min="0" :max="9"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="updateFriendLink">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {Delete, Edit} from "@element-plus/icons-vue";
import {deleteAppInfoApi, getAppInfoListApi, updateAppInfoListApi} from "../../apis/app_api.ts";
import {CODE_SUCCESS} from "../../utils/constants.js";
import {reactive, ref} from "vue";
import {BlogApp} from "../../pojo/BlogApp.ts";
import {ElMessage, ElMessageBox, FormRules} from "element-plus";

const appInfoList = ref<BlogApp>()

function getAppInfoList() {
  getAppInfoListApi().then(
      response => {
        if (response.data.code === CODE_SUCCESS) {
          appInfoList.value = response.data.data
        }
      }
  )
}

getAppInfoList()

const dialogVisible = ref<boolean>(false)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const ruleForm = reactive<BlogApp>({
  versionName: "",
  versionCode: 1,
  appName: "",
  downloadUrl: "",
  changeLog: "",
  forceUpdate: 0
})

const rules = reactive<FormRules<BlogApp>>({
  appName: [
    {required: true, message: 'Please input app name', trigger: 'blur'}
  ],
  versionName: [
    {required: true, message: 'Please input version name', trigger: 'blur'}
  ],
  versionCode: [
    {required: true, message: 'Please input version code', trigger: 'blur'}
  ],
  downloadUrl: [
    {required: true, message: 'Please input download url', trigger: 'blur'}
  ]
})

function resetForm() {
  ruleForm.versionName = ""
  ruleForm.versionCode = 1
  ruleForm.appName = ""
  ruleForm.downloadUrl = ""
  ruleForm.changeLog = ""
  ruleForm.forceUpdate = 0
}

function deleteAppInfo(data: BlogApp) {
  ElMessageBox.confirm('确定删除该APP信息？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        deleteAppInfoApi(data.id).then(response => {
          if (response.data.code === CODE_SUCCESS) {
            ElMessage.success('删除APP信息成功')
            getAppInfoList()
          } else {
            ElMessage.error('删除失败，请稍后再试')
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).catch(error => {
          ElMessage.error('删除失败，请稍后再试')
        })
      })
}

function openUpdateAppInfoDialog(data: BlogApp | null) {
  if (data !== undefined && data !== null) {
    ruleForm.id = data.id
    ruleForm.versionName = data.versionName
    ruleForm.versionCode = data.versionCode
    ruleForm.appName = data.appName
    ruleForm.downloadUrl = data.downloadUrl
    ruleForm.changeLog = data.changeLog
    ruleForm.forceUpdate = data.forceUpdate
  }
  dialogVisible.value = true
}

function updateAppInfo() {
  updateAppInfoListApi(ruleForm).then(response => {
    if (response.data.code === CODE_SUCCESS) {
      ElMessage.success('提交APP信息成功')
      getAppInfoList()
      dialogVisible.value = false
    } else {
      ElMessage.error('提交失败，请稍后再试')
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }).catch(error => {
    ElMessage.error('提交失败，请稍后再试')
  })
}

</script>

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>APP版本管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <div class="header">
      <el-button type="primary" @click="openUpdateAppInfoDialog(null)">添加APP记录</el-button>
    </div>
    <el-table :data="appInfoList" border style="width: 100%" stripe>
      <el-table-column prop="appName" label="APP Name" align="center"/>
      <el-table-column prop="versionName" label="Version Name" align="center"/>
      <el-table-column prop="versionCode" label="Version Code" align="center"/>
      <el-table-column prop="downloadUrl" label="Download Url" align="center"/>
      <el-table-column prop="changeLog" label="Change Log" align="center"/>
      <el-table-column label="Force Update" align="center">
        <template #default="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.forceUpdate === 0">非强更</el-tag>
          <el-tag type="danger" effect="dark" v-else>强更</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="Update Time" align="center"/>
      <el-table-column label="Operations" align="center">
        <template #default="scope">
          <el-button type="danger" :icon="Delete" size="small"
                     @click="deleteAppInfo(scope.row)"></el-button>
          <el-button type="info" :icon="Edit" size="small"
                     @click="openUpdateAppInfoDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <div class="edit-app-dialog">
    <el-dialog
        @close="resetForm"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-model="dialogVisible"
        title="编辑APP信息">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          status-icon>
        <el-form-item label="App name" prop="appName">
          <el-input v-model="ruleForm.appName"/>
        </el-form-item>
        <el-form-item label="Version name" prop="versionName">
          <el-input v-model="ruleForm.versionName"/>
        </el-form-item>
        <el-form-item label="Version code" prop="versionCode">
          <el-input v-model="ruleForm.versionCode"/>
        </el-form-item>
        <el-form-item label="Download url" prop="downloadUrl">
          <el-input v-model="ruleForm.downloadUrl"/>
        </el-form-item>
        <el-form-item label="Change log" prop="changeLog">
          <el-input v-model="ruleForm.changeLog"/>
        </el-form-item>
        <el-form-item label="Force update">
          <el-select v-model="ruleForm.forceUpdate">
            <el-option label="非强更" :value="0"/>
            <el-option label="强更" :value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateAppInfo">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

.header {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}

.edit-app-dialog {
  text-align: start;
}

</style>

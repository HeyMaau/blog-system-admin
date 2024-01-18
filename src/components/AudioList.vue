<script setup lang="ts">

import {Delete, Edit} from "@element-plus/icons-vue";
import {deleteAudioApi, getAudioListApi} from "@/apis/audio_api.ts";
import {ref} from "vue";
import {CODE_SUCCESS} from "@/utils/constants.js";
import UpdateAudioDialog from "@/components/UpdateAudioDialog.vue";
import {BlogAudio} from "@/pojo/BlogAudio.ts";
import {ElMessage, ElMessageBox} from "element-plus";

let page = 1
let size = 10
const total = ref(0)
const audioList = ref([])

function getAudioList() {
  getAudioListApi(page, size).then(response => {
    if (response.data.code === CODE_SUCCESS) {
      audioList.value = response.data.data.data
      total.value = response.data.data.total
    }
  })
}

getAudioList()

const currentAudio = ref<BlogAudio>({})
const updateAudioDialogVisibility = ref(false)

function addAudio() {
  updateAudioDialogVisibility.value = true
  currentAudio.value = {}
}

function deleteAudio(audio: BlogAudio) {
  ElMessageBox.confirm(
      '确认删除音频？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(() => {
    deleteAudioApi(audio.id).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        ElMessage.success('删除音频成功')
        getAudioList()
      } else {
        ElMessage.success('删除音频失败')
      }
    })
  })
}

function updateAudio(audio: BlogAudio): void {
  currentAudio.value = audio
  updateAudioDialogVisibility.value = true
}

function onUpdateAudioDialogUpdate() {
  getAudioList()
}

function onUpdateAudioDialogClose() {
  currentAudio.value = {}
  updateAudioDialogVisibility.value = false
}

</script>

<template>
  <div>
    <el-card>
      <div class="audio-list-add-button">
        <el-button type="primary" @click="addAudio">添加音频</el-button>
      </div>
      <el-table
          border
          :data="audioList"
          stripe
          style="width: 100%">
        <el-table-column
            align="center"
            min-width="20%"
            prop="name"
            show-overflow-tooltip
            label="名称">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="20%"
            prop="artist"
            show-overflow-tooltip
            label="艺术家">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="30%"
            prop="album"
            label="专辑">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="5%"
            prop="audioOrder"
            label="顺序">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="15%"
            label="操作">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" size="small"
                       @click="deleteAudio(scope.row)"></el-button>
            <el-button type="info" :icon="Edit" size="small"
                       @click="updateAudio(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div v-show="updateAudioDialogVisibility">
      <UpdateAudioDialog :visibility="updateAudioDialogVisibility"
                         :data="currentAudio"
                         @onUpdateSuccess="onUpdateAudioDialogUpdate"
                         @onDialogClose="onUpdateAudioDialogClose"/>
    </div>
  </div>
</template>

<style scoped>

.audio-list-add-button {
  text-align: left;
  margin-bottom: 5px;
}

</style>
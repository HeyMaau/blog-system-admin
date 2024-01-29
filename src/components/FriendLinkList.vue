<script setup lang="ts">

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import {CODE_SUCCESS} from "../utils/constants.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteFriendLinkApi, getFriendLinkListApi} from "../apis/friend_link_api.ts";
import {BlogFriendLink} from "../pojo/BlogFriendLink.ts";
import UpdateFriendLinkDialog from "../components/UpdateFriendLinkDialog.vue";

let page = 1
let size = 10
const total = ref(0)
const friendLinkList = ref<BlogFriendLink[]>([])

function getFriendLinkList() {
  getFriendLinkListApi(page, size).then(response => {
    if (response.data.code === CODE_SUCCESS) {
      friendLinkList.value = response.data.data.data
      total.value = response.data.data.total
    }
  })
}

getFriendLinkList()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const currentFriendLink = ref<BlogFriendLink>({})
const updateFriendLinkDialogVisibility = ref(false)

function addFriendLink() {
  updateFriendLinkDialogVisibility.value = true
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  currentFriendLink.value = {}
}

function deleteFriendLink(friendLink: BlogFriendLink) {
  ElMessageBox.confirm(
      '确认删除该友情链接？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(() => {
    deleteFriendLinkApi(friendLink.id).then(response => {
      if (response.data.code === CODE_SUCCESS) {
        ElMessage.success('删除友情链接成功')
        getFriendLinkList()
      } else {
        ElMessage.success('删除友情链接失败')
      }
    })
  })
}

function updateFriendLink(friendLink: BlogFriendLink): void {
  currentFriendLink.value = friendLink
  updateFriendLinkDialogVisibility.value = true
}

function onUpdateFriendLinkDialogUpdate() {
  getFriendLinkList()
}

function onUpdateFriendLinkDialogClose() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  currentFriendLink.value = {}
  updateFriendLinkDialogVisibility.value = false
}

</script>

<template>
  <div>
    <el-card>
      <div class="friend-link-list-add-button">
        <el-button type="primary" @click="addFriendLink">添加友情链接</el-button>
      </div>
      <el-table
          border
          :data="friendLinkList"
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
            min-width="25%"
            prop="url"
            show-overflow-tooltip
            label="Url">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="25%"
            prop="logo"
            label="Logo">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="5%"
            prop="linkOrder"
            label="顺序">
        </el-table-column>
        <el-table-column
            align="center"
            min-width="15%"
            label="操作">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" size="small"
                       @click="deleteFriendLink(scope.row)"></el-button>
            <el-button type="info" :icon="Edit" size="small"
                       @click="updateFriendLink(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div v-show="updateFriendLinkDialogVisibility">
      <UpdateFriendLinkDialog :visibility="updateFriendLinkDialogVisibility"
                              :data="currentFriendLink"
                              @onUpdateSuccess="onUpdateFriendLinkDialogUpdate"
                              @onDialogClose="onUpdateFriendLinkDialogClose"/>
    </div>
  </div>
</template>

<style scoped>

.friend-link-list-add-button {
  text-align: left;
  margin-bottom: 5px;
}

</style>
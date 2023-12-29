<template>
  <el-card>
    <div class="total-visit-statistics-container">
      <el-statistic :value="totalVisit">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            总访问量
          </div>
        </template>
      </el-statistic>
      <el-statistic :value="desktopTotalVisit">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            PC端访问量
          </div>
        </template>
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <Monitor/>
          </el-icon>
        </template>
      </el-statistic>
      <el-statistic :value="mobileTotalVisit">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            移动端访问量
          </div>
        </template>
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <Iphone/>
          </el-icon>
        </template>
      </el-statistic>
    </div>
  </el-card>
</template>

<script setup lang="ts">

import {Iphone, Monitor} from "@element-plus/icons-vue";
import {onBeforeMount, ref} from "vue";
import {getClientTotalVisit, getTotalVisit} from "../../apis/statistics_api.ts";
import {CODE_SUCCESS} from "../../utils/constants.js";
import {ElMessage} from "element-plus";

onBeforeMount(() => {
  document.title = '首页 | 后台管理 - 卧卷'
})

let totalVisit = ref(0)
let desktopTotalVisit = ref(0)
let mobileTotalVisit = ref(0)

getTotalVisit().then(value => {
  if (value.data.code === CODE_SUCCESS) {
    totalVisit.value = value.data.data.totalVisit
  } else {
    ElMessage.error(value.data.message)
  }
})

getClientTotalVisit('mobile').then(value => {
  if (value.data.code === CODE_SUCCESS) {
    mobileTotalVisit.value = value.data.data.totalVisit
  } else {
    ElMessage.error(value.data.message)
  }
})

getClientTotalVisit('desktop').then(value => {
  if (value.data.code === CODE_SUCCESS) {
    desktopTotalVisit.value = value.data.data.totalVisit
  } else {
    ElMessage.error(value.data.message)
  }
})

</script>

<style scoped>

.total-visit-statistics-container {
  display: flex;
  justify-content: center;
  gap: 0 200px;
}

:deep(.el-statistic__head) {
  font-size: 20px;
  color: cornflowerblue;
  font-weight: bold;
}

:deep(.el-statistic__content) {
  margin-top: 10px;
}

</style>
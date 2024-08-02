<script setup lang="ts">
import { computed, onMounted, type Ref, ref, watch } from 'vue'
import request from '@/request'
import type { Result, Task } from '@/Models'

const data: Ref<Task[]> = ref([])
const pageNum = ref('1')
const results: Ref<Result[]> = ref([])

const tableData = computed(() => {
  return data.value.map((item, index) => {
    return {
      ...item,
      result: results.value.find((result) => result.taskId === item.taskId)
    }
  })
})
console.log(tableData.value)

const getResults = () => {
  for (let item of data.value) {
    if (item.status == '已完成') {
      request()
        .get(`/result/${item.resultId}`)
        .then((res) => {
          results.value.push(res.data)
        })
    }
  }
}
const getHistory = () => {
  request()
    .get('/task', {
      params: {
        page: pageNum.value,
        size: 10
      }
    })
    .then((res) => {
      data.value = res.data
      getResults()
    })
}


onMounted(() => {
  getHistory()
})

watch(pageNum, () => {
  getHistory()
  console.log('pageNum changed')
})
</script>

<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="100"
    v-model:current-page="pageNum"
  />
  <el-table :data="tableData">
    <el-table-column prop="taskId" label="任务ID"></el-table-column>
    <el-table-column prop="scopeType" label="任务类型"></el-table-column>
    <el-table-column prop="fileType" label="文件类型"></el-table-column>
    <el-table-column prop="content" label="内容"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="result.category" label="分类"></el-table-column>
    <el-table-column prop="result.score" label="得分"></el-table-column>
  </el-table>
</template>

<style scoped></style>

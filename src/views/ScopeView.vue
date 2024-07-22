<script setup lang="ts">
import { ref } from 'vue'
import request from '@/request'

const contentType = ref('text')
const textContent = ref('')
const audioContent = ref()

const handleFileChange = (newFile: File) => {
  audioContent.value = newFile
}

const submit = () => {
  if (contentType.value == 'text') {
    request().post(
      '/task_text',
      {
        scopeType: 'risk',
        contentType: contentType.value,
        textContent: contentType.value == 'text' ? textContent.value : ''
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  } else {
    request().post(
      '/task_audio',
      {
        scopeType: 'risk',
        contentType: contentType.value,
        audioContent: contentType.value == 'audio' ? audioContent.value.raw : ''
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
</script>

<template>
  <div class="contentForm">
    <el-form label-width="auto">
      <el-form-item label="内容类型">
        <el-radio-group v-model="contentType">
          <el-radio-button value="text">文本</el-radio-button>
          <el-radio-button value="audio">音频</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文本识别" v-if="contentType === 'text'">
        <el-input v-model="textContent" type="textarea" placeholder="请输入文本"></el-input>
      </el-form-item>
      <el-form-item label="音频识别" v-if="contentType === 'audio'">
        <el-upload action="#" :limit="1" :auto-upload="false" :on-change="handleFileChange">
          <template v-slot:trigger>
            <el-button @click="handleFileChange">选取文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
      <div style="display: flex; flex-direction: row-reverse">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.contentForm {
  max-width: 500px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

import useRequest from '@/request'

const request = useRequest()

const username = ref('')
const password = ref('')

const login = (username: string, password: string) => {
  request.post('/user/login',
    {
      grant_type: 'password',
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res => {
    localStorage.setItem('token', res.data.access_token)
  }))
}
const register = (username: string, password: string) => {
  request.post('/user/register',
    {
      username,
      password
    }, {}).then(() => {
    login(username, password)
  })
}
</script>

<template>

  <el-form class="login-form">
    <el-form-item>
      <el-input
        v-model="username"
        type="text"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="password"
        type="password"
        show-password
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button
          type="primary"
          style="width: 100%"
          @click="login(username, password)"
        >登录
        </el-button
        >
      </el-col>
      <el-col :span="12">
        <el-button
          type="primary"
          style="width: 100%"
          @click="register(username, password)"
        >注册
        </el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
  padding-top: 100px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

import useRequest from '@/request'

const request = useRequest()

const username = ref('')
const password = ref('')

let isLogin = ref(localStorage.getItem('token') !== null)

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
    isLogin.value = true
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

const logout = () => {
  localStorage.removeItem('token')
  isLogin.value = false
}
</script>

<template>
  <section class="column">

    <p style="font-size:35px; padding-bottom: 30px"><b>风险杀手</b>——基于大模型的风险识别系统</p>
    <template v-if="!isLogin">

      请登录或注册
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
    <template v-if="isLogin">
      <el-button
        type="danger"
        @click="logout()"
      >退出登录
      </el-button>
      <el-button
        type="primary"
        size="large"
        @click="$router.push('/scope')"
        style=" margin-top: 30px"
      >开始识别
      </el-button>
    </template>


  </section>
</template>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
  padding-top: 30px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
}
</style>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">风险识别系统</el-menu-item>
      </el-menu>

    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <el-icon>
              <House />
            </el-icon>
            主页
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <ZoomIn />
            </el-icon>
            风险识别
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <View />
            </el-icon>
            历史记录
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-main>
          <div>

            <RouterView />
          </div>
        </el-main>
        <!--          <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>

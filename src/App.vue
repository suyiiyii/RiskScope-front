<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseAside from '@/components/layouts/BaseAside.vue'
import BaseHeader from '@/components/layouts/BaseHeader.vue'
</script>

<template>
  <el-container class="flex main-container" style="flex-direction: column">
    <BaseHeader />
    <el-container class="flex">
      <el-container>
        <BaseAside />
        <el-container>
          <el-main>

            <RouterView />

          </el-main>
          <!--          <el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>


<style scoped>

.main-container {
  height: 100vh;
}
</style>
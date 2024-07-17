<template>
  <el-aside width="200px">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      style="height: 100%"
    >
      <RouterLink to="/home">

        <el-menu-item index="1">
          <el-icon>
            <House />
          </el-icon>
          主页
        </el-menu-item>
      </RouterLink>
      <RouterLink to="scope">
        <el-menu-item index="2">
          <el-icon>
            <ZoomIn />
          </el-icon>
          风险识别
        </el-menu-item>
      </RouterLink>
      <RouterLink to="history">
        <el-menu-item index="3">
          <el-icon>
            <View />
          </el-icon>
          历史记录
        </el-menu-item>
      </RouterLink>
    </el-menu>

  </el-aside>
</template>
<script>
import { View } from '@element-plus/icons-vue'

export default {
  name: 'BaseAside'
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
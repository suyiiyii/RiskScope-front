<template>
  <el-aside width="200px">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      style="height: 100%"
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
</template>
<script>
export default {
  name: 'BaseAside'
}
</script>
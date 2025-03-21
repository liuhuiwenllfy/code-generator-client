<script lang="ts" setup>
import {useRouter} from "vue-router";
import VeNight from '@/components/ve-night/index.vue'
import VeFooter from 've-footer/ve-default-footer/index.vue'

const router = useRouter()

const handleSelect = (key: string) => {
  switch (key) {
    case '0':
      window.open('https://www.liulingfengyu.cn')
      break
    case '1':
      router.push({name: 'database-connection'})
      break
    case '2':
      router.push({name: 'code-generator-params'})
      break
    case '3':
      router.push({name: 'code-generator'})
      break
  }
}
</script>

<template>
  <el-menu
      default-active="3"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img style="height: 48px; width: 48px; margin-right: 8px" src="/logo.png" alt="CodeEase logo"/>
      <h2>CodeEase</h2>
    </el-menu-item>
    <el-menu-item index="1">数据库连接</el-menu-item>
    <el-menu-item index="2">代码生成器参数</el-menu-item>
    <el-menu-item index="3">代码生成</el-menu-item>
    <ve-night style="margin: 20px"/>
  </el-menu>
  <el-scrollbar class="pages-scrollbar">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path"/>
    </router-view>
  </el-scrollbar>
  <ve-footer/>
</template>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item:nth-child(4) {
  margin-right: auto;
}
.pages-scrollbar {
  height: calc(100vh - 162px);
  margin: 20px
}
</style>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {useRouter} from "vue-router";

const item = ref('database-connection')

const options = [
  {
    label: '代码生成器参数',
    value: 'code-generator-params',
  },
  {
    label: '数据库连接',
    value: 'database-connection',
  },
  {
    label: '代码生成',
    value: 'code-generator',
  }
]

const router = useRouter()

const change = (value: string) => {
  router.push({name: value})
}

watch(() => router.currentRoute.value.name, (value) => {
  item.value = <string>value
}, {immediate: true})
</script>

<template>
  <div style="margin: 20px 20px 10px">
    <el-segmented v-model="item" :options="options" block @change="change">
      <template #default="scope">
        <span>{{ scope.item.label }}</span>
      </template>
    </el-segmented>
  </div>
  <el-scrollbar class="pages-scrollbar">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path"/>
    </router-view>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.pages-scrollbar {
  margin: 20px
}
</style>

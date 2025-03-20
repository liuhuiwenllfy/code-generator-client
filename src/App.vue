<script lang="ts" setup>
import {reactive, watch} from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {useCommonStore} from "@/pinia/common.js";

const config = reactive({
  autoInsertSpace: true
})
const commonStore = useCommonStore()

const html = document.querySelector('html')
watch(() => commonStore.dark, () => {
  if (html) {
    if (commonStore.dark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
}, {immediate: true})

</script>

<template>
  <el-config-provider :button="config" :size="commonStore.globalSize" :locale="zhCn">
    <div v-loading.fullscreen.lock="commonStore.fullscreenLoading" class="page">
      <router-view/>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>

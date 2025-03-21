<script lang="ts" setup>
import {VeMdCloudyNight, VeSunny, VeThemeLightDark} from 've-icon/components.ts'
import {onBeforeMount} from "vue";
import {useCommonStore} from "@/pinia/common.ts";

const commonStore = useCommonStore()

onBeforeMount(() => {
  handleCommand(commonStore.dark)
})
const handleCommand = (command: boolean) => {
  const html = document.querySelector('html')
  if (html) {
    if (command) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
  // @ts-ignore
  commonStore.changeDark(command)
}
</script>

<template>
  <div class="night">
    <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon><VeThemeLightDark/></el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="false" :disabled="!commonStore.dark">
            <el-icon style="font-size: 16px">
              <VeSunny/>
            </el-icon>
            白天
          </el-dropdown-item>
          <el-dropdown-item :command="true" :disabled="commonStore.dark">
            <el-icon style="font-size: 16px">
              <VeMdCloudyNight/>
            </el-icon>
            黑夜
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.night {
  text-align: right;

  .el-icon {
    font-size: 20px;

    &:hover {
      color: $brand;
    }
  }

  .el-dropdown {
    color: var(--color);
  }
}
</style>

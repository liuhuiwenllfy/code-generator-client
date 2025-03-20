<script lang="ts" setup>
import {nextTick, ref, watch} from 'vue'
import {resData} from '@/interface/res'
import {getCodeGeneratorParamsById} from '@/api/result/codeGeneratorParams.ts'
import {CodeGeneratorParamsVo} from "@/interface/vo/codeGeneratorParams/codeGeneratorParamsVo.ts";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: () => false
  },
  id: {
    type: String,
    required: true,
    default: () => {
    }
  }
})

watch(() => props.dialogVisible, () => {
  nextTick(() => {
    getById(props.id)
  })
})

let _data = ref<CodeGeneratorParamsVo>({
  id: "",
  title: '',
  version: null,
  api: '',
  author: '',
  isRemovePrefix: null,
  javaProjectAddress: '',
  moduleName: '',
  packageName: '',
  vueProjectAddress: '',
})

const emits = defineEmits(['closed'])

const closed = () => {
  emits('closed')
}

const getById = async (id: string) => {
  const res = <resData>await getCodeGeneratorParamsById({id: id})
  if (res.ok) {
    _data.value = Object.assign(_data.value, res.data)
  }
}
</script>

<template>
  <el-dialog
      v-model="props.dialogVisible"
      destroy-on-close
      draggable
      width="500px"
      @closed="closed">
    <template #header>
      详情
    </template>
    <el-form
        :model="_data"
        label-position="top">
      <el-form-item>
        <template #label>
          <strong>标题</strong>
        </template>
        <el-text type="info">{{ _data.title }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>前端接口片段</strong>
        </template>
        <el-text type="info">{{ _data.api }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>作者</strong>
        </template>
        <el-text type="info">{{ _data.author }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>是否去表前缀</strong>
        </template>
        <el-text type="info">{{ _data.isRemovePrefix ? '是' : '否' }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>后端项目地址</strong>
        </template>
        <el-text type="info">{{ _data.javaProjectAddress }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>模块名</strong>
        </template>
        <el-text type="info">{{ _data.moduleName }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>包名</strong>
        </template>
        <el-text type="info">{{ _data.packageName }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>前端项目地址</strong>
        </template>
        <el-text type="info">{{ _data.vueProjectAddress }}</el-text>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<style lang="scss" scoped>
</style>

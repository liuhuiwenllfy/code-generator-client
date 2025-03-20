<script lang="ts" setup>
import SearchArea from 've-search-area/index.vue'
import {Refresh, Search,} from '@element-plus/icons-vue'
import {onMounted, onUnmounted, ref} from 'vue'
import {FormInstance} from 'element-plus/es'
import {CodeGeneratorParamsPageDto} from '@/interface/dto/codeGeneratorParams/codeGeneratorParamsPageDto.ts'
import {createEmitter} from '@/assets/js/eventBus'
import {setPageInfo} from '@/assets/js/common'

const emitter = createEmitter()

onMounted(() => {
  emitter.on('refresh', (e: any) => {
    setPageInfo(form, e);
    onSubmit()
  })
  onSubmit()
})

onUnmounted(() => {
  emitter.off('refresh')
})

const formRef = ref<FormInstance | any>()

const form = ref<CodeGeneratorParamsPageDto>({
  page: 1,
  pageSize: 10,
  title: ''
})

const emits = defineEmits(['onSubmit', 'onReset'])

const onSubmit = () => {
  emits('onSubmit', form.value)
}

const onReset = (formEl: FormInstance) => {
  if (!formEl) return
  formEl?.resetFields()
  emits('onReset', form.value)
}
</script>

<template>
  <SearchArea>
    <template #searchBtn>
      <div class="search-btn">
        <el-button
            :icon="Search"
            type="primary"
            @click="onSubmit">查询
        </el-button>
        <el-button
            :icon="Refresh"
            plain
            type="primary"
            @click="onReset(formRef)">清空
        </el-button>
      </div>
    </template>
    <template #default>
      <el-form ref="formRef" :inline="true" :model="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"
                    clearable
                    placeholder="请输入标题"/>
        </el-form-item>
      </el-form>
    </template>
  </SearchArea>
</template>

<style lang="scss" scoped>
</style>

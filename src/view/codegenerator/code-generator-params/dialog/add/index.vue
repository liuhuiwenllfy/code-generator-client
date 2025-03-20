<script lang="ts" setup>
import {FormInstance} from 'element-plus/es'
import {computed, reactive, ref} from 'vue'
import {FormRules} from 'element-plus'
import {useCommonStore} from "@/pinia/common.ts";
import {CodeGeneratorParamsInsertDto} from "@/interface/dto/codeGeneratorParams/codeGeneratorParamsInsertDto.ts";

const commonStore = useCommonStore();

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: () => false
  }
})

const _data = ref<CodeGeneratorParamsInsertDto>({
  title: '',
  api: '',
  author: '',
  isRemovePrefix: null,
  javaProjectAddress: '',
  moduleName: '',
  packageName: '',
  vueProjectAddress: '',
})

const formRef = ref<FormInstance | any>()

const rules = computed(() => {
  return reactive<FormRules>({
    title: [
      {required: true, message: '请输入标题', trigger: 'blur'},
      {min: 1, max: 90, message: '标题长度在1~90之间', trigger: 'blur'},
    ],
    api: [
      {required: true, message: '请输入前端接口片段', trigger: 'blur'},
      {min: 1, max: 90, message: '前端接口片段长度在1~90之间', trigger: 'blur'},
    ],
    author: [
      {required: true, message: '请输入作者', trigger: 'blur'},
      {min: 1, max: 90, message: '作者长度在1~90之间', trigger: 'blur'},
    ],
    isRemovePrefix: [
      {required: true, message: '请输入是否去表前缀', trigger: 'blur'},
    ],
    javaProjectAddress: [
      {required: true, message: '请输入后端项目地址', trigger: 'blur'},
      {min: 1, max: 900, message: '后端项目地址长度在1~900之间', trigger: 'blur'},
    ],
    moduleName: [
      {required: true, message: '请输入模块名', trigger: 'blur'},
      {min: 1, max: 90, message: '模块名长度在1~90之间', trigger: 'blur'},
    ],
    packageName: [
      {required: true, message: '请输入包名', trigger: 'blur'},
      {min: 1, max: 90, message: '包名长度在1~90之间', trigger: 'blur'},
    ],
    vueProjectAddress: [
      {required: true, message: '请输入前端项目地址', trigger: 'blur'},
      {min: 1, max: 900, message: '前端项目地址长度在1~900之间', trigger: 'blur'},
    ],
  })
})

const emits = defineEmits(['closed', 'onSubmit'])

const closed = (formEl: FormInstance) => {
  formEl?.resetFields()
  emits('closed')
}

const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      emits('onSubmit', _data.value)
    }
  })
}

const resetForm = (formEl: FormInstance) => {
  if (!formEl) return
  formEl?.resetFields()
}
</script>

<template>
  <el-dialog
      v-model="props.dialogVisible"
      destroy-on-close
      draggable
      width="500px"
      @closed="closed(formRef)">
    <template #header>
      新增
    </template>
    <el-form
        ref="formRef"
        :model="_data"
        :rules="rules"
        label-position="top"
        width="500px">
      <el-form-item prop="title">
        <template #label>
          标题
        </template>
        <el-input v-model="_data.title"
                  placeholder="请输入标题"
                  clearable/>
      </el-form-item>
      <el-form-item prop="api">
        <template #label>
          前端接口片段
        </template>
        <el-input v-model="_data.api"
                  placeholder="请输入前端接口片段"
                  clearable/>
      </el-form-item>
      <el-form-item prop="author">
        <template #label>
          作者
        </template>
        <el-input v-model="_data.author"
                  placeholder="请输入作者"
                  clearable/>
      </el-form-item>
      <el-form-item prop="isRemovePrefix">
        <template #label>
          是否去表前缀
        </template>
        <el-switch
            v-model="_data.isRemovePrefix"
            active-text="是"
            inactive-text="是"
            inline-prompt/>
      </el-form-item>
      <el-form-item prop="javaProjectAddress">
        <template #label>
          后端项目地址
        </template>
        <el-input v-model="_data.javaProjectAddress"
                  placeholder="请输入后端项目地址"
                  clearable/>
      </el-form-item>
      <el-form-item prop="moduleName">
        <template #label>
          模块名
        </template>
        <el-input v-model="_data.moduleName"
                  placeholder="请输入模块名"
                  clearable/>
      </el-form-item>
      <el-form-item prop="packageName">
        <template #label>
          包名
        </template>
        <el-input v-model="_data.packageName"
                  placeholder="请输入包名"
                  clearable/>
      </el-form-item>
      <el-form-item prop="vueProjectAddress">
        <template #label>
          前端项目地址
        </template>
        <el-input v-model="_data.vueProjectAddress"
                  placeholder="请输入前端项目地址"
                  clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(formRef)">清空</el-button>
        <el-button :loading="commonStore.loading" type="primary" @click="submitForm(formRef)">确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>

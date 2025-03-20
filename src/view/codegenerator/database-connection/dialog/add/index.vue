<script lang="ts" setup>
import {FormInstance} from 'element-plus/es'
import {computed, reactive, ref} from 'vue'
import {FormRules} from 'element-plus'
import {DatabaseConnectionInsertDto} from '@/interface/dto/databaseConnection/DatabaseConnectionInsertDto'
import {useCommonStore} from "@/pinia/common.ts";

const commonStore = useCommonStore();

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: () => false
  }
})

const _data = ref<DatabaseConnectionInsertDto>({
  title: "",
  password: "",
  remark: "",
  url: "",
  username: ""
})

const formRef = ref<FormInstance>()

const rules = computed(() => {
  return reactive<FormRules>({
    title: [
      {required: true, message: '请输入标题', trigger: 'blur'},
      {min: 1, max: 90, message: '长度在1~90之间', trigger: 'blur'},
    ],
    url: [
      {required: true, message: '请输入地址', trigger: 'blur'},
      {min: 1, max: 300, message: '长度在1~300之间', trigger: 'blur'},
    ],
    username: [
      {required: true, message: '请输入用户名', trigger: 'blur'},
      {min: 1, max: 30, message: '长度在1~30之间', trigger: 'blur'},
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      {min: 1, max: 30, message: '长度在1~30之间', trigger: 'blur'},
    ],
    remark: [
      {max: 300, message: '长度在1~300之间', trigger: 'blur'},
    ]
  })
})

const emits = defineEmits(['closed', 'onSubmit'])

const closed = (formEl: FormInstance | undefined | any) => {
  formEl?.resetFields()
  emits('closed')
}

const submitForm = async (formEl: FormInstance | undefined | any) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      emits('onSubmit', _data.value)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined | any) => {
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
      <el-form-item prop="url">
        <template #label>
          地址
        </template>
        <el-input v-model="_data.url"
                  placeholder="请输入地址"
                  clearable/>
      </el-form-item>
      <el-form-item prop="username">
        <template #label>
          用户名
        </template>
        <el-input v-model="_data.username"
                  placeholder="请输入用户名"
                  clearable/>
      </el-form-item>
      <el-form-item prop="password">
        <template #label>
          密码
        </template>
        <el-input v-model="_data.password"
                  placeholder="请输入密码"
                  clearable/>
      </el-form-item>
      <el-form-item prop="remark">
        <template #label>
          备注
        </template>
        <el-input v-model="_data.remark"
                  placeholder="请输入备注"
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

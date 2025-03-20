<script lang="ts" setup>
import {nextTick, watch, ref} from 'vue'
import {resData} from '@/interface/res'
import {getDatabaseConnectionById} from '@/api/result/databaseConnection.ts'
import {DatabaseConnectionVo} from '@/interface/vo/databaseConnection/DatabaseConnectionVo'

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

let _data = ref<DatabaseConnectionVo>({
  title: "",
  createTime: null,
  createUser: "",
  id: "",
  password: "",
  remark: "",
  url: "",
  username: "",
  version: 0
})

const emits = defineEmits(['closed'])

const closed = () => {
  emits('closed')
}

const getById = async (id: string) => {
  const res = <resData>await getDatabaseConnectionById({id: id})
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
          <strong>地址</strong>
        </template>
        <el-text type="info">{{ _data.url }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>用户名</strong>
        </template>
        <el-text type="info">{{ _data.username }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>密码</strong>
        </template>
        <el-text type="info">{{ _data.password }}</el-text>
      </el-form-item>
      <el-form-item>
        <template #label>
          <strong>备注</strong>
        </template>
        <el-text type="info">{{ _data.remark }}</el-text>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<style lang="scss" scoped>
</style>

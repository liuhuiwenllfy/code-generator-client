<script lang="ts" setup>
import SearchArea from 've-search-area/index.vue'
import {Refresh, Search,} from '@element-plus/icons-vue'
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {FormInstance} from 'element-plus/es'
import {FormRules} from "element-plus";
import {DatabaseConnectionVo} from "@/interface/vo/databaseConnection/DatabaseConnectionVo.ts";
import {resData} from "@/interface/res.ts";
import {getDatabaseConnectionList} from "@/api/result/databaseConnection.ts";
import {getDatabaseList, getDatabaseTableList} from "@/api/result/codeGenerator.ts";
import {CodeGeneratorParamsVo} from "@/interface/vo/codeGeneratorParams/codeGeneratorParamsVo.ts";
import {getCodeGeneratorParamsList} from "@/api/result/codeGeneratorParams.ts";
import {GenerateCodeDto} from "@/interface/dto/codeGenerator/GenerateCodeDto.ts";
import {TableIdAndCommentVo} from "@/interface/vo/codeGenerator/TableIdAndCommentVo.ts";

onMounted(() => {
  databaseConnectionList()
  codeGeneratorParamsList()
})

const _data = ref<GenerateCodeDto>({
  isGenerateVue: false,
  isCover: false,
  isGenerateJava: false,
  isGenerateTreeSelect: false,
  tableAndFieldDtoList: [],
  codeGeneratorParamsId: "",
  databaseConnectionId: "",
  databaseName: "",
  databaseTableList: []
})

const formRef = ref<FormInstance | any>()

const rules = computed(() => {
  return reactive<FormRules>({
    codeGeneratorParamsId: [
      {required: true, message: '请选择参数模板', trigger: 'change'},
    ],
    databaseConnectionId: [
      {required: true, message: '请选择数据库连接', trigger: 'change'},
    ],
    databaseName: [
      {required: true, message: '请选择数据库', trigger: 'change'},
    ],
    databaseTableList: [
      {required: true, message: '请选择数据库表', trigger: 'change'},
    ],
  })
})

const emits = defineEmits(['onSubmit', 'onReset', 'onChange'])

const onSubmit = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      emits('onSubmit', _data.value)
    }
  })
}

const onReset = (formEl: FormInstance) => {
  if (!formEl) return
  formEl?.resetFields()
  emits('onReset', _data.value)
}

const _databaseConnectionList = ref<DatabaseConnectionVo[]>([])

const databaseConnectionList = async () => {
  const res = <resData>await getDatabaseConnectionList()
  if (res.ok) {
    _databaseConnectionList.value = res.data
  }
}

const _databaseList = ref<String[]>([])

watch(() => _data.value.databaseConnectionId, () => {
  if (_data.value.databaseConnectionId) {
    databaseList()
  } else {
    _databaseList.value = []
  }
  _data.value.databaseName = ''
  _data.value.databaseTableList = []
})

const databaseList = async () => {
  const res = <resData>await getDatabaseList({databaseConnectionId: _data.value.databaseConnectionId})
  if (res.ok) {
    _databaseList.value = res.data
  }
}

const _codeGeneratorParamsList = ref<CodeGeneratorParamsVo[]>([])

const codeGeneratorParamsList = async () => {
  const res = <resData>await getCodeGeneratorParamsList()
  if (res.ok) {
    _codeGeneratorParamsList.value = res.data
  }
}

const _databaseTableList = ref<TableIdAndCommentVo[]>([])

watch(() => _data.value.databaseName, () => {
  if (_data.value.databaseName) {
    databaseTableList()
  } else {
    _databaseTableList.value = []
  }
  _data.value.databaseTableList = []
})

const databaseTableList = async () => {
  const res = <resData>await getDatabaseTableList({
    databaseConnectionId: _data.value.databaseConnectionId,
    databaseName: _data.value.databaseName
  })
  if (res.ok) {
    _databaseTableList.value = res.data
  }
}

watch(() => _data.value, () => {
  emits('onChange', _data.value)
}, {deep: true})
</script>

<template>
  <SearchArea>
    <template #searchBtn>
      <div class="search-btn">
        <el-button
            :icon="Search"
            type="primary"
            @click="onSubmit(formRef)">查询
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
      <el-form
          ref="formRef"
          :model="_data"
          :rules="rules"
          inline>
        <el-form-item prop="codeGeneratorParamsId">
          <template #label>
            参数模板
          </template>
          <el-select v-model="_data.codeGeneratorParamsId"
                     style="width: 200px"
                     placeholder="请选择参数模板"
                     clearable>
            <el-option v-for="(item, index) in _codeGeneratorParamsList" :key="index" :label="item.title"
                       :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="databaseConnectionId">
          <template #label>
            数据库连接
          </template>
          <el-select v-model="_data.databaseConnectionId"
                     style="width: 200px"
                     placeholder="请选择数据库连接"
                     clearable>
            <el-option v-for="(item, index) in _databaseConnectionList" :key="index" :label="item.title"
                       :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="databaseName">
          <template #label>
            数据库
          </template>
          <el-select v-model="_data.databaseName"
                     style="width: 200px"
                     placeholder="请选择数据库"
                     clearable>
            <el-option v-for="(item, index) in _databaseList" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="databaseTableList">
          <template #label>
            数据库表
          </template>
          <el-select v-model="_data.databaseTableList"
                     style="width: 200px"
                     placeholder="请选择数据库表"
                     multiple
                     collapse-tags
                     collapse-tags-tooltip
                     clearable>
            <el-option v-for="(item, index) in _databaseTableList" :key="index" :label="item.tableComment"
                       :value="item.tableName">
              <span style="float: left">{{ item.tableName }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                {{ item.tableComment }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isCover">
          <template #label>
            是否覆盖
          </template>
          <el-switch
              v-model="_data.isCover"
              active-text="是"
              inactive-text="否"
              inline-prompt/>
        </el-form-item>
        <el-form-item prop="isGenerateJava">
          <template #label>
            是否生成后端代码
          </template>
          <el-switch
              v-model="_data.isGenerateJava"
              active-text="是"
              inactive-text="否"
              inline-prompt/>
        </el-form-item>
        <el-form-item prop="isGenerateTreeSelect">
          <template #label>
            是否生成树结构
          </template>
          <el-switch
              v-model="_data.isGenerateTreeSelect"
              active-text="是"
              inactive-text="否"
              inline-prompt/>
        </el-form-item>
      </el-form>
    </template>
  </SearchArea>
</template>

<style lang="scss" scoped>
</style>

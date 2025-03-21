<script setup lang="ts">
import {nextTick, ref} from "vue";
import {initPageHeight} from "@/assets/js/pageHeight.ts";
import {resData} from "@/interface/res.ts";
import {generateCode, getTableAndField} from "@/api/result/codeGenerator.ts";
import {TableAndFieldVo} from "@/interface/vo/codeGenerator/TableAndFieldVo.ts";
import Search from "@/view/codegenerator/code-generator/search/index.vue";
import Table from "@/view/codegenerator/code-generator/table/index.vue";
import {initTableHeight} from "@/assets/js/tableHeight.ts";
import {GenerateCodeDto} from "@/interface/dto/codeGenerator/GenerateCodeDto.ts";
import {TableAndFieldDto} from "@/interface/dto/codeGenerator/TableAndFieldDto.ts";

const pageRef = ref()
const searchRef = ref()
const tableRef = ref()
nextTick(() => {
  initTableHeight(pageRef, searchRef, tableRef, -42)
  initPageHeight(pageRef, 0)
})

const onSubmit = (form: any) => {
  getTableData(form)
}

const onReset = () => {
  tableData.value = []
}

const onTableClick = (type: any, rows: TableAndFieldVo[]) => {
  switch (type) {
    case 'generate':
      _generatorData.value.tableAndFieldDtoList = <TableAndFieldDto[]> rows
      onGenerate()
      break
    default:
      console.warn('Button type cannot be empty')
      break
  }
}

const onGenerate = () => {
  generateCode(_generatorData.value)
}

const tableLoading = ref(false)

const tableData = ref<TableAndFieldVo[]>([])

const _generatorData = ref<GenerateCodeDto>({
  isGenerateVue: false,
  isGenerateTreeSelect: false,
  codeGeneratorParamsId: "",
  databaseConnectionId: "",
  databaseName: "",
  databaseTableList: [],
  isCover: false,
  isGenerateJava: false,
  tableAndFieldDtoList: []
})

const getTableData = async (form: {}) => {
  tableLoading.value = true
  const res = <resData>await getTableAndField(form)
  tableLoading.value = false
  if (res.ok) {
    tableData.value = res.data
  }
}

const handleSearchChange = (generateCodeDto: GenerateCodeDto) => {
  _generatorData.value = Object.assign(_generatorData.value, generateCodeDto)
}
</script>

<template>
  <div ref="pageRef" class="page">
    <Search ref="searchRef" @onReset="onReset" @onSubmit="onSubmit" @onChange="handleSearchChange"/>
    <Table ref="tableRef"
           :loading="tableLoading"
           :tableData="tableData"
           @onTableClick="onTableClick">
    </Table>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  margin-top: 10px;
}
</style>
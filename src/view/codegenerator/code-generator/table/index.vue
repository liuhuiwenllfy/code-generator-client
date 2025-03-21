<script lang="ts" setup>
import TableArea from 've-table-area/index.vue'
import TableColumn from 've-table-column/index.vue'
import {tableHeight} from '@/assets/js/tableHeight'
import {CirclePlus} from '@element-plus/icons-vue'
import {computed, onMounted, ref, watch} from 'vue'
import {useCommonStore} from "@/pinia/common.ts";
import {TableAndFieldVo} from "@/interface/vo/codeGenerator/TableAndFieldVo.ts";
import {getUiTypeList} from "@/api/result/codeGenerator.ts";
import {resData} from "@/interface/res.ts";
import {UiTypeVo} from "@/interface/vo/codeGenerator/UiTypeVo.ts";

const commonStore = useCommonStore();

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: () => false
  },
  tableData: {
    type: Array as () => Array<TableAndFieldVo>,
    required: true,
    default: () => []
  }
})

const tableMap = ref(new Map<string, TableAndFieldVo[]>())

watch(()=> props.tableData, ()=>{
  checkTableKey.value = ''
  tableMap.value.clear()
  props.tableData.forEach((row) => {
    if (tableMap.value.has(row.tableName)) {
      const _list = <TableAndFieldVo[]>tableMap.value.get(row.tableName);
      _list.push(row)
      tableMap.value.set(row.tableName, _list)
    }else {
      const _list = [];
      _list.push(row)
      tableMap.value.set(row.tableName, _list)
      if (!checkTableKey.value) {
        checkTableKey.value = row.tableName
      }
    }
  })
})

const columnList = computed(() => [
  {
    fixed: true,
    sortable: true,
    prop: 'columnName',
    minWidth: 120,
    label: '字段名称'
  },
  {
    fixed: true,
    sortable: true,
    prop: 'columnComment',
    coverColumn: true,
    minWidth: 120,
    label: '字段注释'
  },
  {
    sortable: true,
    prop: 'isCondition',
    coverColumn: true,
    label: '条件'
  },
  {
    sortable: true,
    prop: 'isFuzzyQuery',
    coverColumn: true,
    label: '模糊查询'
  },
  {
    sortable: true,
    prop: 'isShow',
    coverColumn: true,
    label: '是否展示'
  },
  {
    sortable: true,
    prop: 'isAddParam',
    coverColumn: true,
    label: '新增参数'
  },
  {
    sortable: true,
    prop: 'isUpdateParam',
    coverColumn: true,
    label: '修改参数'
  },
  {
    sortable: true,
    prop: 'uiType',
    coverColumn: true,
    minWidth: 120,
    label: 'UI类型'
  },
  {
    sortable: true,
    prop: 'dictGroup',
    coverColumn: true,
    minWidth: 120,
    label: '选择框字典分组'
  },
])

const emits = defineEmits(['onTableClick'])

const handleClick = (type: string) => {
  emits('onTableClick', type, Array.from(tableMap.value.values()).flat())
}

const handleRefresh = () => {
  emits('onTableClick', 'generate', props.tableData)
}

const _fullScreen = ref(false)

const _tableHeight = ref()

const handleFullScreen = (fullScreen: boolean, tableHeight: number) => {
  _fullScreen.value = fullScreen
  _tableHeight.value = tableHeight
}

const getTableName = (tableKey: string) => {
  const _list = <TableAndFieldVo[]>tableMap.value.get(tableKey);
  return _list[0].tableComment
}

const checkTableKey = ref<string>('')

const checkTable = (tableKey: string) => {
  checkTableKey.value = tableKey
}

const _uiTypeList = ref<UiTypeVo[]>([])

onMounted(()=>{
  uiTypeList()
})

const uiTypeList = async () => {
  const res = <resData>await getUiTypeList()
  if (res.ok){
    _uiTypeList.value = res.data
  }
}
</script>

<template>
  <TableArea>
    <template #header>
      <el-popconfirm title="确认要生成吗?" @confirm="handleClick('generate')">
        <template #reference>
          <el-button
              :disabled="tableData.length === 0"
              :icon="CirclePlus"
              :loading="commonStore.loading"
              type="primary">
            生成
          </el-button>
        </template>
      </el-popconfirm>

    </template>
    <template #main>
      <el-row>
        <el-col :span="4">
          <el-scrollbar :style="{height: `${_fullScreen? _tableHeight: tableHeight}px`}">
            <div v-for="(item, index) in tableMap.keys()" :key="index" class="table-item" :class="checkTableKey === item? 'checked': ''" @click="checkTable(item)">
              <el-space direction="vertical" alignment="stretch">
                <el-text truncated>{{item}}</el-text>
                <el-text truncated>{{getTableName(item)}}</el-text>
              </el-space>
            </div>
            <el-empty v-if="checkTableKey === ''"/>
          </el-scrollbar>
        </el-col>
        <el-col :span="20">
          <el-table v-loading="props.loading"
                    :data="tableMap.get(checkTableKey)"
                    :default-sort="{ prop: 'createTime', order: 'descending' }"
                    :height="_fullScreen? _tableHeight: tableHeight"
                    border
                    default-expand-all
                    row-key="id">
            <TableColumn
                :column-list="columnList"
                :index="true"
                :operation-show="false"
                :table-height="tableHeight"
                region-class="ve-table"
                @handle-full-screen="handleFullScreen"
                @handle-refresh="handleRefresh">
              <template #columnComment="scope">
                <el-input v-model="scope.row.columnComment" placeholder="请输入字段注释" clearable/>
              </template>
              <template #isCondition="scope">
                <el-switch
                    v-model="scope.row.isCondition"
                    active-text="是"
                    inactive-text="否"
                    inline-prompt/>
              </template>
              <template #isFuzzyQuery="scope">
                <el-switch
                    v-model="scope.row.isFuzzyQuery"
                    active-text="是"
                    inactive-text="否"
                    inline-prompt/>
              </template>
              <template #isShow="scope">
                <el-switch
                    v-model="scope.row.isShow"
                    active-text="是"
                    inactive-text="否"
                    inline-prompt/>
              </template>
              <template #isAddParam="scope">
                <el-switch
                    v-model="scope.row.isAddParam"
                    active-text="是"
                    inactive-text="否"
                    inline-prompt/>
              </template>
              <template #isUpdateParam="scope">
                <el-switch
                    v-model="scope.row.isUpdateParam"
                    active-text="是"
                    inactive-text="否"
                    inline-prompt/>
              </template>
              <template #uiType="scope">
                <el-select v-model="scope.row.uiType" placeholder="请选择UI类型" clearable>
                  <el-option v-for="(item, index) in _uiTypeList" :key="index" :label="item.value" :value="item.key"/>
                </el-select>
              </template>
              <template #dictGroup="scope">
                <el-input v-model="scope.row.dictGroup" placeholder="请输入数据字典分组名称" clearable/>
              </template>
            </TableColumn>
          </el-table>
          <slot name="pagination"/>
        </el-col>
      </el-row>
    </template>
  </TableArea>
</template>

<style lang="scss" scoped>
.table-item{
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
}

.checked{
  background-color: $brand5;
}
</style>

<script lang="ts" setup>
import TableArea from 've-table-area/index.vue'
import TableColumn from 've-table-column/index.vue'
import {tableHeight} from '@/assets/js/tableHeight'
import {CirclePlus, Delete, Document, Edit} from '@element-plus/icons-vue'
import {computed, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {CodeGeneratorParamsVo} from '@/interface/vo/codeGeneratorParams/codeGeneratorParamsVo.ts'
import {createEmitter} from "@/assets/js/eventBus.ts";

const emitter = createEmitter()

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: () => false
  },
  tableData: {
    type: Array as () => Array<CodeGeneratorParamsVo>,
    required: true,
    default: () => []
  }
})

const columnList = computed(() => [
  {
    sortable: 'custom',
    prop: 'title',
    label: '标题'
  },
  {
    sortable: 'custom',
    prop: 'api',
    label: '前端接口片段'
  },
  {
    sortable: 'custom',
    prop: 'author',
    label: '作者'
  },
  {
    sortable: 'custom',
    prop: 'isRemovePrefix',
    coverColumn: true,
    label: '是否去表前缀'
  },
  {
    sortable: 'custom',
    prop: 'javaProjectAddress',
    label: '后端项目地址'
  },
  {
    sortable: 'custom',
    prop: 'moduleName',
    label: '模块名'
  },
  {
    sortable: 'custom',
    prop: 'packageName',
    label: '包名'
  },
  {
    sortable: 'custom',
    prop: 'vueProjectAddress',
    label: '前端项目地址'
  },
])

const selected = ref<Array<CodeGeneratorParamsVo>>([])

const onSelectionChange = (val: CodeGeneratorParamsVo[]) => {
  selected.value = val
}

const emits = defineEmits(['onTableClick'])

const handleClick = (type: string, id: string = '') => {
  if (type === 'batchDelete') {
    if (selected.value.length === 0) {
      ElMessage.warning('请选择要删除的数据')
      return
    }
    let idArray = <any[]>[]
    selected.value.forEach(row => idArray.push(row.id))
    id = idArray.join(',')
  }
  emits('onTableClick', type, id)
}

const onSortChange = (column: any) => {
  emitter.emit('refresh', column)
}

const handleRefresh = () => {
  emitter.emit('refresh')
}

const _fullScreen = ref(false)

const _tableHeight = ref()

const handleFullScreen = (fullScreen: boolean, tableHeight: number) => {
  _fullScreen.value = fullScreen
  _tableHeight.value = tableHeight
}
</script>

<template>
  <TableArea>
    <template #header>
      <el-button
          :icon="CirclePlus"
          type="primary"
          @click="handleClick('add')">
        新增
      </el-button>
      <el-button
          :icon="Delete"
          plain
          type="danger"
          @click="handleClick('batchDelete')">
        批量删除
      </el-button>
    </template>
    <template #main>
      <el-table v-loading="props.loading"
                :data="props.tableData"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                :height="_fullScreen? _tableHeight: tableHeight"
                border
                default-expand-all
                row-key="id"
                @sort-change="onSortChange"
                @selection-change="onSelectionChange">
        <TableColumn
            :column-list="columnList"
            :index="false"
            :selection="true"
            :table-height="tableHeight"
            region-class="ve-table"
            @handle-full-screen="handleFullScreen"
            @handle-refresh="handleRefresh">
          <template #isRemovePrefix="scope">
            {{ scope.row.isRemovePrefix ? '是': '否' }}
          </template>
          <template #default="scope">
            <el-button
                :icon="Document"
                plain
                size="small"
                @click="handleClick('details', scope.row.id)">
              详情
            </el-button>
            <el-button
                :icon="Edit"
                plain
                size="small"
                type="primary"
                @click="handleClick('edit', scope.row.id)">
              修改
            </el-button>
            <el-button
                :icon="Delete"
                plain
                size="small"
                type="danger"
                @click="handleClick('delete', scope.row.id)">
              删除
            </el-button>
          </template>
        </TableColumn>
      </el-table>
      <slot name="pagination"/>
    </template>
  </TableArea>
</template>

<style scoped>

</style>

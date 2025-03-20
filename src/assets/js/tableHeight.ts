import {Ref, ref, watch} from 'vue'
import {useCommonStore} from "@/pinia/common.ts";
// 初始化表格高度
const page = ref()
const search = ref()
const table = ref()
const offsetHeight = ref()
export const initTableHeight = (pageRef: Ref<HTMLElement>, searchRef: Ref<HTMLElement>, tableRef: Ref<HTMLElement>, offset = 0) => {
    page.value = pageRef.value
    search.value = searchRef.value
    table.value = tableRef.value
    offsetHeight.value = offset
    getTableHeight()
    window.addEventListener('resize', () => {
        getTableHeight()
    })
}
const commonStore = useCommonStore();
// 监听globalSize（全局尺寸）变化重新计算表格高度
watch(() => commonStore.globalSize, () => {
    getTableHeight()
})
// 监听fullScreen（全屏）变化重新计算高度
watch(() => commonStore.fullScreen, () => {
    getTableHeight()
})
// 表格高度参数
export const tableHeight = ref(0)
// 偏移量参数（自定义表格页面可以重新设置偏移量）
export const otherOffset = ref(77)
// 计算表格高度函数（如果页面上有其他元素可以自行添加逻辑）
export const getTableHeight = () => {
    setTimeout(() => {
        tableHeight.value =
            page.value.clientHeight
            - search.value.$el.clientHeight
            - table.value.$el.firstChild.clientHeight
            - offsetHeight.value
            - otherOffset.value
    }, 150)
    window.removeEventListener('resize', () => {
    })
}

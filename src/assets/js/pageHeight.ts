import {Ref, ref, watch} from 'vue'
import {useCommonStore} from "@/pinia/common.ts";
// 初始化页面高度
const page = ref()
const offsetHeight = ref()
export const initPageHeight = (pageRef: Ref<HTMLElement>, offset = 0) => {
    page.value = pageRef.value
    offsetHeight.value = offset
    getPageHeight()
    window.addEventListener('resize', () => {
        getPageHeight()
    })
}
const commonStore = useCommonStore();
// 监听globalSize（全局尺寸）变化重新计算页面高度
watch(() => commonStore.globalSize, () => {
    getPageHeight()
})
// 监听fullScreen（全屏）变化重新计算高度
watch(() => commonStore.fullScreen, () => {
    getPageHeight()
})
// 页面高度参数
export const pageHeight = ref(0)
// 偏移量参数（自定义页面页面可以重新设置偏移量）
export const offset = ref(2)
// 计算页面高度函数（如果页面上有其他元素可以自行添加逻辑）
export const getPageHeight = () => {
    setTimeout(() => {
        pageHeight.value =
            page.value.clientHeight
            - offsetHeight.value
            - offset.value
    }, 150)
    window.removeEventListener('resize', () => {
    })
}

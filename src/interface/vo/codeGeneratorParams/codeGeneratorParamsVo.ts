import {BaseInfo} from '@/interface/base/BaseInfo.ts'

export interface CodeGeneratorParamsVo extends BaseInfo{
    title: string   // 标题
    api: string   // 前端接口片段
    author: string   // 作者
    isRemovePrefix: boolean | null  // 是否去表前缀
    javaProjectAddress: string   // 后端项目地址
    moduleName: string   // 模块名
    packageName: string   // 包名
    vueProjectAddress: string   // 前端项目地址
}

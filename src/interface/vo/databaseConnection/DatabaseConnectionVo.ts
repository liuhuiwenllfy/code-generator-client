import {BaseInfo} from '@/interface/base/BaseInfo.ts'

export interface DatabaseConnectionVo extends BaseInfo {
    title: string  // 标题
    password: string  // 密码
    remark: string  // 备注
    url: string  // 地址
    username: string  // 用户名
}

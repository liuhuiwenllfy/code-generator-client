import {UpdateInfo} from '@/interface/base/UpdateInfo.ts'

export interface DatabaseConnectionUpdateDto extends UpdateInfo {
    title: string  // 标题
    password: string  // 密码
    remark: string  // 备注
    url: string  // 地址
    username: string  // 用户名
}

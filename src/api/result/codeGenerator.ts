import {get, post} from '@/api/http-server'

const api = 'api';

/**
 * 获取数据库列表
 * @param params
 */
export const getDatabaseList = (params = {}) => {
    return get(`/${api}/codegenerator/codeGenerator/getDatabaseList`, params)
}

/**
 * 获取数据库表列表
 * @param params
 */
export const getDatabaseTableList = (params = {}) => {
    return get(`/${api}/codegenerator/codeGenerator/getDatabaseTableList`, params)
}

/**
 * 获取表和字段信息
 * @param data
 */
export const getTableAndField = (data = {}) => {
    return post(`/${api}/codegenerator/codeGenerator/getTableAndField`, data)
}

/**
 * 生成代码
 * @param data
 */
export const generateCode = (data = {}) => {
    return post(`/${api}/codegenerator/codeGenerator/generateCode`, data)
}

/**
 * 获取UI类型
 * @param params
 */
export const getUiTypeList = (params = {}) => {
    return get(`/${api}/codegenerator/codeGenerator/getUiTypeList`, params)
}

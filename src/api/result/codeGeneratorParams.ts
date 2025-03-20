import {get, post, put, remove} from '@/api/http-server'

const api = 'api';

/**
 * 条件分页查询代码生成参数
 * @param params
 */
export const getCodeGeneratorParamsByPage = (params = {}) => {
return get(`/${api}/codegenerator/codeGeneratorParams/getByPage`, params)
}

/**
 * 查询代码生成参数集合
 * @param params
 */
export const getCodeGeneratorParamsList = (params = {}) => {
return get(`/${api}/codegenerator/codeGeneratorParams/getList`, params)
}

/**
 * 新增代码生成参数
 * @param data
 */
export const insertCodeGeneratorParams = (data = {}) => {
return post(`/${api}/codegenerator/codeGeneratorParams/insert`, data)
}

/**
 * 修改代码生成参数
 * @param data
 */
export const updateCodeGeneratorParams = (data = {}) => {
return put(`/${api}/codegenerator/codeGeneratorParams/updateById`, data)
}

/**
 * 根据id查询代码生成参数
 * @param params
 */
export const getCodeGeneratorParamsById = (params = {}) => {
return get(`/${api}/codegenerator/codeGeneratorParams/queryById`, params)
}

/**
 * 批量删除代码生成参数
 * @param params
 */
export const deleteCodeGeneratorParams = (params = {}) => {
return remove(`/${api}/codegenerator/codeGeneratorParams/deleteBatchByIdList`, params)
}
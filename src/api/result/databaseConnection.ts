import {get, post, put, remove} from '@/api/http-server'

const api = 'api';

/**
 * 条件分页查询数据库连接
 * @param params
 */
export const getDatabaseConnectionByPage = (params = {}) => {
    return get(`/${api}/codegenerator/databaseConnection/getByPage`, params)
}

/**
 * 查询数据库连接集合
 * @param params
 */
export const getDatabaseConnectionList = (params = {}) => {
    return get(`/${api}/codegenerator/databaseConnection/getList`, params)
}

/**
 * 新增数据库连接
 * @param data
 */
export const insertDatabaseConnection = (data = {}) => {
    return post(`/${api}/codegenerator/databaseConnection/insert`, data)
}

/**
 * 修改数据库连接
 * @param data
 */
export const updateDatabaseConnection = (data = {}) => {
    return put(`/${api}/codegenerator/databaseConnection/updateById`, data)
}

/**
 * 根据id查询数据库连接
 * @param params
 */
export const getDatabaseConnectionById = (params = {}) => {
    return get(`/${api}/codegenerator/databaseConnection/queryById`, params)
}

/**
 * 批量删除数据库连接
 * @param params
 */
export const deleteDatabaseConnection = (params = {}) => {
    return remove(`/${api}/codegenerator/databaseConnection/deleteBatchByIdList`, params)
}
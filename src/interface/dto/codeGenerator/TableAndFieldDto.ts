export interface TableAndFieldDto{
    databaseConnectionId: string
    databaseName: string
    tableName: string
    tableComment: string
    columnName: string
    columnComment: string
    columnType: string
    characterMaximumLength: number
    dataType: string
    javaType: string
    tsType: string
    isAutofill: boolean
    autofillRule: string
    isAddParam: boolean
    isCondition: boolean
    isFuzzyQuery: boolean
    isLogicDelete: boolean
    isPrimaryKey: boolean
    isShow: boolean
    isUpdateParam: boolean
    isVersion: boolean
    uiType: string
    dictGroup: string
}
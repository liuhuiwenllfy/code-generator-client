// 分页查询包装函数
export const setPageInfo = (form: any, e: any) => {
    if (e) {
        if (e['page']) {
            form.page = e['page']
        }
        if (e['pageSize']) {
            form.pageSize = e['pageSize']
        }
        if (e['prop']) {
            switch (e['order']) {
                case 'ascending':
                    form.ascs = e['prop']
                    form.descs = ''
                    break
                case 'descending':
                    form.ascs = ''
                    form.descs = e['prop']
                    break
                default:
                    form.ascs = ''
                    form.descs = ''
            }
        }
    }
}
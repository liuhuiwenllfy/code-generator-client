export interface TreeNode {
    id: string  // 节点id
    name: string  // 节点名称
    parentId: string  // 父节点
    sort: number  // 排序
    children: TreeNode[]  // 子节点
    disabled?: boolean  // 是否禁用
}

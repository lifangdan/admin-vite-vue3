<template>
    <div class="base-table-panel">
        <el-table
            :data="tableData"
            v-loading="loading"
            :stripe="stripe"
            :height="height ? height : null"
            :max-height="maxHeight"
            :highlight-current-row="highlightCurrentRow"
            size="default"
            header-row-class-name="table-header-row"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            @expand-change="handleExpand"
            :border="border"
        >
            <el-table-column type="expand" v-if="isShowExpand">
                <template v-slot="{ row }">
                    <slot name="expand" :row="row" />
                </template>
            </el-table-column>

            <el-table-column
                v-if="showSelection"
                :selectable="selectable"
                type="selection"
                width="55"
            />
            <el-table-column
                v-if="showIndex"
                label="序号"
                type="index"
                :width="indexWidth"
                :index="indexMethod"
            />

            <template v-for="(item, index) in tableProps">
                <template v-if="!item.slotName">
                    <el-table-column
                        :key="index"
                        v-if="item.show !== false"
                        v-bind="item"
                        :show-overflow-tooltip="true"
						
                    />
                </template>
                <template v-else>
                    <el-table-column
                        :key="index"
                        v-if="item.show !== false"
                        v-bind="item"
                        :show-overflow-tooltip="true"
                    >
                        <template v-slot="{ row }">
                            <slot :name="item.slotName" :row="row" />
                        </template>
                    </el-table-column>
                </template>
            </template>
            <el-table-column
                label="操作"
                class-name="custom-btn-box"
                v-if="tableBtns.length > 0"
                :show-overflow-tooltip="false"
                :width="customWidth ? customWidth : `${110 * maxNum}px`"
            >
                <template #default="scope">
                    <el-row>
                        <el-button
                            v-for="(btn, ind) in getBtnFun(scope.row)"
                            :key="ind"
                            link
                            type="primary"
                            @click="handleClick(scope.row, scope.$index, btn.handle)"
                            class="btn"
                        >
                            <div class="flex">
                                <svg-icon
                                    class="el-icon-table"
                                    v-if="btn.icon"
                                    :iconName="btn.icon"
                                    size="12"
                                ></svg-icon>
                                <span>{{ btn.label }}</span>
                            </div>
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            size="default"
            v-if="isShowPagination"
            :currentPage="currentNum"
            :page-size="sizeNum"
            background
            :layout="layout"
            :page-sizes="[10, 20, 50, 100]"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getcurrentPage } from '@/utils'

const emits = defineEmits([
    'sizeChange',
    'currentChange',
    'selectionChange',
    'getTableData',
    'rowClick',
    'expandChange'
])
const props = defineProps({
    // 表格列表属性(必传)
    tableProps: {
        type: Array,
        required: true,
        default: () => {
            return []
        }
    },
    // 操作按钮
    tableBtns: {
        type: Array,
        default: () => {
            return []
        }
    },
    // 方式1：传表格数据，则需传total参数，还需额外在父组件自己处理分页搜索等功能
    data: {
        type: Array,
        default: () => {
            return []
        }
    },
    // 方式2：传url和表单搜索条件params，组件负责处理分页和搜索
    url: {
        type: [Function, Boolean],
        default: false
    },
    // 表格搜索条件
    params: {
        type: Object,
        default: () => {
            return {}
        }
    },
    // 是否要刷新表格列表数据，例如点击搜索/重置按钮时要更新数据
    isRefresh: {
        type: Boolean,
        default: false
    },
    // 页码总数
    total: {
        type: Number,
        default: 0
    },
    // 是否展示序号
    showIndex: {
        type: Boolean,
        default: true
    },
    // 序号宽度
    indexWidth: {
        type: String,
        default: '80px'
    },
    // 是否展示多选框
    showSelection: {
        type: Boolean,
        default: false
    },
    // 设置斑马纹
    stripe: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: false
    },
    current: {
        type: Number,
        default: 1
    },
    size: {
        type: Number,
        default: 10
    },
    // 是否显示分页
    isShowPagination: {
        type: Boolean,
        default: true
    },
    // 分页展示内容
    layout: {
        type: String,
        default: 'prev, pager, next, total, sizes'
    },
    // 表格高度
    height: {
        type: [Number, String],
        default: null
    },
    maxHeight: {
        type: [Number, String]
    },
    // 开启表格行单选高亮效果
    highlightCurrentRow: {
        type: Boolean,
        default: false
    },
    // 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
    selectable: {
        type: Function
    },
    // 设置表格操作按钮列的宽度
    customWidth: {
        type: [Number, String]
    },
    // 是否立即请求接口
    immediateRequest: {
        type: Boolean,
        default: true
    },
    isShowExpand: {
        type: Boolean,
        default: false
    }
})

const totalNum = ref(0)
const currentNum = ref(1)
const sizeNum = ref(10)
const loading = ref(false)
const tableData = ref([])
const maxNum = ref(1)

async function getTableData () {
    loading.value = true
    try {
        const params = {
            ...props.params,
            current: currentNum.value,
            size: sizeNum.value
        }
        const { data } = await props.url(params)
        tableData.value = data?.records || []
        totalNum.value = data?.total || 0
        loading.value = false

        emits('getTableData', data.records)
    } catch (err) {
        console.log('getTableData', err)
    } finally {
        loading.value = false
    }

    // loading.value = true
    // props
    // 	.url({
    // 		...props.params,
    // 		current: currentNum.value,
    // 		size: sizeNum.value
    // 	})
    // 	.then((res) => {
    // 		tableData.value = res.records
    // 		totalNum.value = res.total
    // 		loading.value = false
    // 		emits('getTableData', res.records)
    // 	})
    // 	.catch((_) => {
    // 		loading.value = false
    // 	})
}
// 修改每页显示数量
const handleSizeChange = (val) => {
    emits('sizeChange', val)
    sizeNum.value = val
    if (props.url) {
        currentNum.value = 1
        getTableData()
    }

    console.log(`${val} items per page`)
}
// 切换分页
const handleCurrentChange = (val) => {
    currentNum.value = val
    emits('currentChange', val)
    if (props.url) {
        getTableData()
    }

    console.log(`current page: ${val}`)
}

const indexMethod = (index) => {
    return (currentNum.value - 1) * sizeNum.value + index + 1
}

// 多选事件
const handleSelectionChange = (val) => {
    emits('selectionChange', val)
}
// 点击表格某一行事件
const handleRowClick = (row) => {
    emits('rowClick', row)
}
const handleExpand = (row, expandedRows) => {
    emits('expandChange', row)
}
// 获取显示的按钮数量
const getBtnFun = (row) => {
    const arr = []
    if (!props.tableBtns.length) return arr
    props.tableBtns.forEach((item) => {
        // 没权限的按钮直接不显示
        if (item.permission === false) return false

        if (item.type && item.type.length > 0) {
            if (item.reverse) {
                const cond = []
                item.type.forEach((i) => {
                    if (i.reverse) {
                        cond.push(row[i.key] !== i.value)
                    } else {
                        cond.push(row[i.key] === i.value)
                    }
                })

                const flag = cond.every((i) => {
                    return i
                })
                if (flag) arr.push(item)
            } else {
                const flag = item.type.some((i) => {
                    if (i.reverse) {
                        return row[i.key] !== i.value
                    } else {
                        return row[i.key] === i.value
                    }
                })
                if (flag) arr.push(item)
            }
        } else {
            arr.push(item)
        }
    })
    maxNum.value = arr.length
    return arr
}

const handleClick = (row, index, callback) => {
    if (callback) {
        callback(row, index)
    }
}

watch(
    () => props.data,
    (newVal, oldVal) => {
        // 有url时表格数据不读data
        if (!props.url) {
            tableData.value = newVal
        }
    },
    {
        deep: true,
        immediate: true
    }
)
watch(
    () => props.total,
    (newVal, oldVal) => {
        totalNum.value = newVal
        // 最后一页只有一条数据，删除时更新页码
        // if (newVal <= 0) return
        // let pages = parseInt(newVal / sizeNum.value)
        // if ((newVal % sizeNum.value) !== 0) {
        // 	pages = pages + 1
        // }
        // if (currentNum.value > pages) {
        // 	currentNum.value = pages
        // }
    },
    {
        immediate: true
    }
)
watch(
    [() => props.url, () => props.size],
    (newVal, oldVal) => {
        sizeNum.value = newVal[1]
        if (newVal[0] && props.immediateRequest) {
            getTableData()
        }
    },
    {
        immediate: true
    }
)
watch(
    () => props.isRefresh,
    (newVal, oldVal) => {
        if (props.url) {
            currentNum.value = getcurrentPage(tableData.value, currentNum.value)
            getTableData()
        }
    }
)
watch(
    () => props.current,
    (newVal, oldVal) => {
        currentNum.value = newVal
    }
)
watch(
    () => props.size,
    (newVal, oldVal) => {
        sizeNum.value = newVal
    }
)
</script>
<style lang="scss" scoped>
.base-table-panel {
    width: 100%;
    :deep() {
        th {
            .cell {
                font-weight: bold;
            }
        }
    }
    .el-table {
        width: 100%;
        // flex: inherit;
        // max-height: calc(100% - 50px);
    }
    .el-pagination {
        margin-top: 16px;
        width: 100%;
        justify-content: flex-end;
    }
}
</style>
<style lang="scss">
.base-table-panel {
    .custom-btn-box {
        .el-button {
            min-width: auto;
            padding: 4px 0;
        }
        .btn {
            margin: 0 14px 0 0 !important;
            display: flex;
            align-items: center;
        }
        .btn:last-child {
            margin: 0 0 0 0 !important;
        }
        .el-icon-table {
            margin-right: 4px;
            font-size: 12px;
        }
        .flex {
            display: flex;
            align-items: center;

            span {
                margin: 0;
            }
        }
    }
}
</style>

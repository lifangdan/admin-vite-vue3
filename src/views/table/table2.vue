<template>
    <div class="page-con">
        <SearchPanel 
        v-model:searchForm="searchForm" 
        @search="handleSearch"
        @reset="handleSearch" 
        :formList="formList" />
        <TablePanel
            ref="tableRef"
            :data="tableData"
            :tableProps="tableProps"
            :total="total"
            @currentChange="handleCurrentChange"
            @sizeChange="handleSizeChange"
        >
            <template #sex="{ row }">
                <span>{{ row.sex===1?'男':'女' }}</span>
            </template>
            <template #status="{ row }">
                <el-switch
                    @input="(val) => handleChangeSwitch(val, row)"
                    v-model="row.status"
                    :active-value="1"
                    :inactive-value="0"
                />
            </template>
            <template #custom="{ row }">
                <el-button link type="primary" @click="handleEdit(row)">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <span>编辑</span>
                </el-button>
                <el-button link type="primary" @click="handleDel(row)">
                    <el-icon>
                        <Delete />
                    </el-icon>
                    <span>删除</span>
                </el-button>
            </template>
        </TablePanel>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getList } from '@/api/home'

const searchForm = ref({})
const formList = [
    { type: 'input', prop: 'name', label: '姓名' },
    {
        type: 'select',
        prop: 'sex',
        label: '性别',
        options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
        ]
    },
    { type: 'input', prop: 'address', label: '地址' },
    {
        type: 'select',
        prop: 'status',
        label: '是否启用',
        options: [
            { label: '是', value: 1 },
            { label: '否', value: 2 }
        ]
    },
    // { type: 'date', prop: 'updateTime', label: '更新时间', xl: 8 }
]

const tableProps = [
    { label: '姓名', prop: 'name' },
    { label: '性别', slotName: 'sex' },
    { label: '年龄', prop: 'age' },
    { label: '邮箱', prop: 'email' },
    { label: '地址', prop: 'address' },
    { label: '是否启用', slotName: 'status' },
    { label: '更新时间', prop: 'updateTime', width: '160' },
    { label: '按钮', slotName: 'custom', width: '200px', show:false }
]
const tableData = ref([])
const total = ref(0)
const current=ref(1)
const size=ref(10)

async function getData () {
    await getList({
        current: current.value,
        size: size.value,
        ...searchForm.value
    }).then((res) => {
        tableData.value = res.data.records
        total.value = res.data.total
    })
}

function handleCurrentChange (val) {
    current.value = val
    getData()
}
function handleSizeChange (val) {
    size.value = val
    current.value = 1
    getData()
}

function handleSearch () {
    size.value = 10
    current.value = 1
    getData()
}

function handleChangeSwitch (val, row) {}
function handleEdit (row) {}
function handleDel (row) {
    ElMessageBox.confirm('您确定要删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            ElMessage.success('删除成功')
        })
        .catch(() => {})
}

onMounted(() => {
    getData()
})
</script>

<style scoped lang="scss">
.text {
    color: $height_default_header;
    height: $header_height;
}
</style>
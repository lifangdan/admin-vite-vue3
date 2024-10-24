<template>
    <div class="page-con">
        <SearchPanel 
        v-model:searchForm="searchForm" 
        @search="handleSearch" 
        @reset="handleSearch"
        :formList="formList" />
        <el-row class="action-row">
            <el-button type="primary" plain @click="handleOpen('add')">
                <el-icon>
                    <Plus />
                </el-icon>
                新增
            </el-button>
            <el-button type="primary" plain>
                <el-icon>
                    <Download />
                </el-icon>
                下载
            </el-button>
            <el-button type="primary" plain @click="handleClick">跳转</el-button>
        </el-row>
        <TablePanel 
        ref="tableRef"
        :params="searchForm"
        :isRefresh="isRefresh" 
        :tableProps="tableProps" 
        :url="getList">
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
                <el-button link type="primary" @click="handleOpen('edit',row)">
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
    <addEditDialog ref="dialogRef" @update="isRefresh=!isRefresh"/>
</template>

  <script setup name="Table">
import { onMounted } from 'vue'
import { getList, deleteList } from '@/api/home'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import addEditDialog from './components/add-edit-dialog.vue'

const router = useRouter()

const searchForm = ref({})
const isRefresh = ref(false)
const formList = [
    { type: 'input', prop: 'name', label: '姓名' },
    {
        type: 'select', prop: 'sex', label: '性别',
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
    // { type: 'date',  prop: 'updateTime', label: '更新时间', xl:8 },
]
const tableProps = [
    { label: '姓名', prop: 'name' },
    { label: '性别', slotName: 'sex' },
    { label: '年龄', prop: 'age' },
    { label: '邮箱', prop: 'email' },
    { label: '地址', prop: 'address' },
    { label: '是否启用', slotName: 'status' },
    { label: '更新时间', prop: 'updateTime', width: '160' },
    { label: '操作', slotName: 'custom', width: '200px', fixed: 'right' }
]
const dialogRef = ref(null)

function handleSearch () {
    console.log(searchForm.value)
    isRefresh.value = !isRefresh.value
}

function handleChangeSwitch (val, row) {}

function handleDel (row) {
    ElMessageBox.confirm('您确定要删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            deleteList(row.id).then((res) => {
                if (res.data) {
                    ElMessage.success('删除成功')
                    isRefresh.value = !isRefresh.value
                }
            })
        })
        .catch(() => {})
}

function handleClick () {
    router.push('/station-manage/test')
}

function handleOpen (type, row = {}) {
    dialogRef.value.openDialog({ type:type, row:row })
}

onMounted(() => {
})
</script>
  <style scoped lang="scss">
</style>
  
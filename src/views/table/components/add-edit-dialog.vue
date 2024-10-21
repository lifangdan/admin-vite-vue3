<template>
    <el-dialog v-model="dialogVisible" :title="type==='add'?'新增':'编辑'" width="600" @close="handleClose">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="form.age" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import {  addList, updateList } from '@/api/home'

const emits = defineEmits(['update']);

const dialogVisible = ref(false)
const type = ref('add')
const form = ref({
    name: '',
    sex: '',
    age: '',
    email: '',
    address: '',
    status: 1
})
const formRef = ref(null)   
const rules = ref({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    age: [
        { required: true, message: '请输入年龄', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮件', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入邮件', trigger: 'blur' }
    ],
})

function openDialog (data) {
    type.value = data.type
    if(type.value === 'edit') {
        form.value = data.row
    } 
    dialogVisible.value = true
}

function handleClose () {
    formRef.value.resetFields()
    dialogVisible.value = false
}

function handleConfirm () {
    formRef.value.validate((valid) => {
        if (valid) {
            if (type.value === 'edit') {
                updateList(form.value).then(res => {
                    if(res.data) {
                        ElMessage.success('编辑成功')
                        emits('update')
                    }
                })
            } else { 
                addList(form.value).then(res => {
                    if (res.data) {
                        ElMessage.success('新增成功')
                        emits('update')
                    }
                })
            }   
            dialogVisible.value = false
        } else {
            console.log('error submit!!')
        }
    })
}

defineExpose({
    openDialog
})
</script>
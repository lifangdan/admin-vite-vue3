<template>
    <div class="page-con">
        <div>
            <el-button type="primary" @click="handleClick">跳转内页详情</el-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

function handleClick () {
    router.push('/station-manage/detail')
}
</script>

<style scoped lang="scss">
</style>
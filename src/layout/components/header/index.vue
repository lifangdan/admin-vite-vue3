<template>
    <header class="header-layout">
        <div class="header-left flex">
            <img class="logo" src="@images/logo.png" />
            <div class="title">后台管理系统</div>
        </div>
        <div class="header-right flex">
            <div class="user-avator">
                <img src="@images/avator.jpg" />
            </div>
            <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref('admin')

function handleCommand (command) {
    switch (command) {
        case 'user':
            break
        case 'logout':
            router.push("/login")
            break
        default:
            break
    }
}
</script>
<style scoped lang="scss">
.header-layout{
    // background: url('@images/index-header-bg.png');
    background-size: 100% 100%;
    background-color: $header_bg_color;

    .header-left{
        width: 500px;
        height: 55px;
        //background: url('@images/index-header-left.png');
        background-size: 100% 100%;
        color: #fff;
        .logo{
            width: 130px;
            margin: 0 12px 0 20px;
        }
        .title{
            font-size: 16px;
            font-weight: 600;
            padding: 0 4px 0 8px;
        }
        .sub-title{
            font-size: 12px;
            font-weight: 600;
        }
    }
    .header-right{
        gap: 10px;
        padding: 0 24px;
        color: #fff;
        .user-avator img{
            width: 36px;
            border-radius: 50%;
        }
        .el-dropdown-link{
            color: #fff;
        }
    }
}
</style>
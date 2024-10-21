<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="loginRef" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button>
                                <el-icon><User /></el-icon>
                                
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button>
                                <el-icon><Lock /></el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
                </div>
                <p class="login-tips">Tips： 用户名：admin，密码：123456</p>
            </el-form>
        </div>
    </div>
</template>
vx
<script>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from '@/stores/user'
import { login } from '@/api/home'
import { setCookie } from '@/utils'

export default {
    setup () {
        const router = useRouter()
        const userStore = useUserStore()
        const param = reactive({
            username: "admin",
            password: "123456",
        });
        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        }
        const loginRef = ref(null)
        const loading = ref(false)

        const submitForm = () => {
            
            loginRef.value.validate((valid) => {
                if (valid) {
                    loading.value = true
                    login(param).then((res) => {
                        if (res.code === 200) {
                            const data = res.data
                            userStore.setUserInfo(data)
                            setCookie('token', data.token)
                            localStorage.setItem("ms_username", data.username)
                            ElMessage.success("登录成功")
                            setTimeout(() => {
                                router.push("/")
                            }, 1000)
                        } else {
                            ElMessage.error(res.data.message)
                            return false
                        }
                    }).finally(() => {
                        loading.value = false
                    });
                } else {
                    return false
                }
            });
        };

        return {
            param,
            rules,
            loginRef,
            submitForm,
            loading,
            // userStore,
        }
    },
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('@images/login-bg.jpg');
    background-size: 100%  100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
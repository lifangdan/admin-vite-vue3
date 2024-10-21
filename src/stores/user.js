import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {},
    }),
    //开启数据持久化，刷新页面数据不会丢失
    persist: true,
    actions: {
        setUserInfo (userInfo) {
            this.userInfo = userInfo
        },
    },
})

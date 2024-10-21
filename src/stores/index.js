import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        isCollapse: false,
    }),
    actions: {
        toggleMenu () {
            this.isCollapse = !this.isCollapse
        },
    },
})

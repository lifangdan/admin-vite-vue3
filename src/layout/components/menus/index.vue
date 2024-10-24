<template>
        <el-menu
            :default-active="activeIndex"
            class="menus-list"
            @select="handleSelect"
            :unique-opened="true"
            router>
            <MenuItem 
                v-for="(item,index) in routeList"
                :item="item" 
                :key="index">
            </MenuItem>
        </el-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './menu-item';
import { routes } from '@/router/routes'

const route = useRoute()

const routeList = computed(() => {
    let arr=[]
    routes.map((item) => {
        arr.push(...item.children)
    })
    return arr
})
const activeIndex = computed(() => {
    if (route.meta && route.meta.activeMenu) {
        return route.meta.activeMenu
    }
    return route.path
})

const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>
<style scoped lang="scss">

</style>

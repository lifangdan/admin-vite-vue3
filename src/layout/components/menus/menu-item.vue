<template>
    <div>
        <template v-if="item.children">
            <el-sub-menu :index="item.path">
                <template #title>
                    <svg-icon v-if="item.meta && item.meta.icon" class="icon" :iconName="item.meta.icon"></svg-icon>
                    <span>{{ item.meta && item.meta.title || 'Title'}}</span>
                </template>
                <MenuItem 
                    :isShow="false"
                    v-for="(menu,index) in item.children" 
                    :item="menu" 
                    :key="index">
                </MenuItem>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="item.path" v-if="item.meta && !item.meta.hidden">
                <svg-icon  class="icon" v-if="item.meta && item.meta.icon" :iconName="item.meta.icon"></svg-icon>
                <template #title>
                    <span>{{ item.meta && item.meta.title  || 'Title'}}</span>
                </template>
                <span v-if="isCollapse && isShow">{{ item.meta && item.meta.title  || 'Title'}}</span>
            </el-menu-item>
        </template>
    </div>
</template>
  
<script setup name="MenuItem">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'

defineProps({
    item: {
        type:Object
    },
    isShow:{
        type:Boolean,
        default:true
    }
})

const store = useStore()
const { isCollapse } = storeToRefs(store)
</script>

<style scoped lang="scss">
.icon{
    width: 14px;
    height: 14px;
    // margin-right: 8px;
}
</style>
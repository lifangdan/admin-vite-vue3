<template>
    <div class="sidebar-layout">
        <div class="navbar flex" @click="handleClick">
            <svg-icon
            class="hamburger"
            :class="{ 'is-active': !isCollapse }"
            iconName="indent"></svg-icon>
        </div>
        <el-scrollbar class="scrollbar-wrapper" :noresize="true" :native="true">
            <Menus :collapse="isCollapse" :class="isCollapse ? 'collapse-menu': 'no-collapse-menu'"/>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Menus from '../menus'

const store = useStore()
const { isCollapse } = storeToRefs(store)

function handleClick () {
    store.toggleMenu()
}
</script>

<style scoped lang="scss">
.navbar{
    height: $tagsview_height;
    border-bottom: 1px solid #e5e5e5;
    justify-content: center;
    padding: 0 16px;
    cursor: pointer;
    background-color: $el_menu_bg_color;

    .hamburger {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: $el_menu_text_color;
    }
    .hamburger.is-active {
        transform: rotate(180deg);
    }
}
.hide-sidebar{
    .navbar{
        justify-content: center;
    }
}
.sidebar-layout{
    .menus-list{
        flex: 1;
        width: 100% !important;
        overflow: hidden;
        transition: width .28s;
        background-color: $el_menu_bg_color;
        border: none;
        :deep(){
            .el-menu-item,.el-sub-menu__title{
                gap: 8px;
                height: 100%;
            }
            .el-menu-item{
                &.is-active{
                    background-color: $el_menu_hover_bg_color;
                    color: $el_menu_active_color;
                }
            }
            
        }
    }

    .collapse-menu{
        :deep(){
            .el-menu-item,.el-sub-menu__title{
                font-size: 12px;
            }
            .el-menu-item,.el-sub-menu{
                height: 80px;
                display: flex;
                align-items: center;
                position: relative;

                &.is-active, &:hover{
                    color: $el_menu_active_color;
                    background-color: $el_menu_hover_bg_color;

                    &:before,&:after{
                        position: absolute;
                        left: 0;
                        right: 0;
                        content: "";
                        width: 100%;
                        height: 1px;
                        background-image: linear-gradient(270deg, rgba($color: $el_menu_active_color, $alpha: 0) 0%, rgba($color: $el_menu_active_color, $alpha: 1) 50%, rgba($color: $el_menu_active_color, $alpha: 0)  100%);
                        background-size: 100% 1px;
                    }
                    &:before{
                        top:0;
                    }
                    &:after{
                        bottom: 0;
                    }
                }
            }
            .el-tooltip__trigger{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: normal;
                gap: 4px;
                .icon{
                    width: 24px !important;
                    height: 24px !important;
                }
                .el-sub-menu__icon-arrow{
                    display: none;
                }
            }
        }
    }
}
.scrollbar-wrapper{
    height: calc(100% - 50px) !important;
}
</style>
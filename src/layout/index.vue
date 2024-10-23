<template>
    <div class="app-layout" :class="{'hide-sidebar':isCollapse}">
        <Header />
        <Sidebar />
        <main class="main-layout">
            <TagsView />
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in-linear">
                    <keep-alive :include="cachedViews">
                        <div class="main-container">
                            <component :is="Component" />
                        </div>
                    </keep-alive>
                </transition>
            </router-view>
            <Footer v-if="false"/>
        </main>
    </div>
</template>
<script setup>
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Header from './components/header'
import Sidebar from './components/sidebar'
import TagsView from './components/tagsView'
import Footer from './components/footer'

const store = useStore()
const { isCollapse } = storeToRefs(store)
const cachedViews=[]

</script>
<style scoped lang="scss">

</style>
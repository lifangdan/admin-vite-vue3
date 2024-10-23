<template>
    <div class="app-layout" :class="{'hide-sidebar':isCollapse}">
        <Header />
        <Sidebar />
        <main class="main-layout">
            <TagsView />
            <div class="main-container">
                <router-view v-slot="{ Component }">
                    <keep-alive :max="5">
                        <component :is="Component" :key="route.name" v-if="route.meta?.keepAlive"/>
                    </keep-alive>
                    <component :is="Component" :key="route.name" v-if="!route.meta?.keepAlive"/>
                </router-view>
            </div>
            <Footer v-if="false"/>
        </main>
    </div>
</template>
<script setup>
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import Header from './components/header'
import Sidebar from './components/sidebar'
import TagsView from './components/tagsView'
import Footer from './components/footer'

const store = useStore()
const route = useRoute()

const { isCollapse } = storeToRefs(store)

</script>
<style scoped lang="scss">

</style>
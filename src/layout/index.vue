<template>
    <div class="app-layout" :class="{'hide-sidebar':isCollapse}">
        <Header />
        <Sidebar />
        <main class="main-layout">
            <TagsView />
            <div class="main-container">
                <router-view v-slot="{ Component }">
                    <!-- <transition name="move" mode="out-in"> -->
                        <!-- <keep-alive :include="tags.nameList"> -->
                            <component :is="Component" />
                        <!-- </keep-alive> -->
                    <!-- </transition> -->
                </router-view>
            </div>
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

</script>
<style scoped lang="scss">

</style>
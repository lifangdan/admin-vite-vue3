<template>
    <div class="tags-view-container">
        <el-scrollbar 
        class="scroll-container" 
        ref="scrollContainer" 
        :vertical="false">
        <div class="tags-list">
                <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.path"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    custom 
                    v-slot="{ navigate,href }">
                    <a class="tags-view-item" :href="href" :class="isActive(tag) ? 'active' : ''" role="link" @click="navigate" @keypress.enter="navigate">
                        <span class="tag-text">
                            {{ tag.meta.title}}
                        </span>
                        <span class="el-icon-close" v-if="!tag.meta.affix" @click.prevent.stop="delTags(tag)">
                            <el-icon :size="12" color="666">
                                <Close />
                            </el-icon>
                            <!-- <Close :size="12" color="666"    /> -->
                        </span>
                    </a>
                    
                </router-link>
            </div>
        </el-scrollbar>
        <div class="tags-view-right">
            <el-breadcrumb class="app-breadcrumb" separator="/">
                <el-breadcrumb-item v-for="item in levelList" :key="item.path">
                    <span class="no-redirect">
                        {{ item.meta.title }}
                    </span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, ref, onBeforeMount, watch } from 'vue'
import { useTagsViewStore } from '@/stores/tagsView'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router/routes'
import path from 'path'
import { deepClone } from '@/utils'

const tagsViewStore = useTagsViewStore()
const router = useRouter()
const route = useRoute()

const menuList = ref([])
const levelList = ref([])

const routeList = computed(() => {
    let arr=[]
    routes.map((item) => {
        arr.push(...item.children)
    })
    return arr
})

const visitedViews = computed(() => {
    return tagsViewStore.visitedViews
})

function getBreadcrumbData (menus, route) {
    let path = []

    function find (node, parents) {
        if (node.path === route.path) {
            return true
        }
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                parents.push(node)
                if (find(node.children[i], parents)) {
                    return true
                }
                parents.pop()
            }
        }
        return false
    }

    for (let i = 0; i < menus.length; i++) {
        if (find(menus[i], path)) {
            return [...path, route]
        }
    }
    return null
}

function reversalTree (treeItems = [], data, children) {
    data.forEach(item => {
        treeItems.push(item)

    if (item[children] && item[children].length !== 0) {
        reversalTree(treeItems, item[children], children)
    }
    })
    return ''
}

function delTags (tag) {
    let index = visitedViews.value.indexOf(tag);
    if (index === visitedViews.value.length - 1) index--
    
    tagsViewStore.delVisitedViews(tag).then((data) => {
        if (isActive(tag)) {
            toLastView(data, index)
        }
    })
}

function toLastView (visitedViews, index = -1) {
    // const latestView = visitedViews.slice(-1)[0]
    const latestView = visitedViews.slice(index)[0]
    
    if (latestView) {
        router.push(latestView)
    } else {
        router.push('/')
    }
}

function addTags () {
    const { path } = route
    let tag = null
    menuList.value.some((item) => {
        if (item.path === path) {
            tag = item
            return true
        }
    })
    if (tag) {
        tagsViewStore.addVisitedViews(tag)
    }
    return false
}

function initTags () {
    const affixTags = filterAffixTags(routeList.value)

    menuList.value.some((item) => {
        if (item.path) {
            const obj = deepClone(item)
            obj.meta.affix = true
            affixTags.unshift(obj)
            return true
        }
    })
    for (const tag of affixTags) {
        tagsViewStore.addVisitedViews(tag)
    }
}

function filterAffixTags (routes, basePath = '/') {
    let tags = []
    routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
            })
        }
        if (route.children) {
            const tempTags = filterAffixTags(
                route.children,
                route.path
            )
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
            }
        }
    })
    return tags
}

function isActive (item) {
    if (route.meta.hidden) {
        return item.path === route.meta.activeMenu
    } else {
        return item.path === route.path
    }
}

watch(route, () => {
    levelList.value = getBreadcrumbData(routeList.value, route)
    addTags()
})

onBeforeMount(() => {
    levelList.value = getBreadcrumbData(routeList.value, route)
    reversalTree(menuList.value, routeList.value, 'children')
})
onMounted(() => {
    initTags();
    addTags();
})
</script>
<style scoped lang="scss">
.tags-view-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $tagsview_height;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    box-sizing: border-box;
    
    .tags-list{
        display: flex;
    }

    .tags-view-item {
        flex-shrink: 0;
        display: inline-block;
        cursor: pointer;
        height: $tagsview_item_height;
        line-height: $tagsview_item_height;
        box-sizing: border-box;
        overflow: hidden;
        color: $tagsview_color;
        padding: 0 10px;
        font-size: 0;
        margin-right: 8px;
        margin-top: 9px;
        border: 1px solid #E5E5E5;
        border-bottom: none;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        transition: padding-right 0.6s;
        min-width: 60px;
        text-align: center  ;

        &:first-of-type {
            margin-left: 15px;
        }
        &:last-of-type {
            margin-right: 15px;
        }
        &.active {
            background-color: $tagsview_active_bg_color;
            border: 1px solid $tagsview_active_bg_color;
            color: $tagsview_active_color;
        }
        &.single {
            padding-right: 16px;
        }
        .tag-text {
            font-size: 12px;
            vertical-align: middle;
        }
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: middle;
            font-size: 12px;
            border-radius: 50%;
            text-align: center;
            margin-left: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background-color: $tagsview_active_color;
                color: #fff;
            }
        }
    }
    .tags-view-right{
        flex-shrink: 0;
        .app-breadcrumb.el-breadcrumb {
            display: inline-block;
            padding: 0 16px;
            .no-redirect {
                color: #999;
                cursor: text;
                font-size: 12px;
            }
        }
    }
    
}
</style>
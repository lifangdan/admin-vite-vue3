import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
    state: () => ({
        visitedViews: [],
    }),
    actions: {
        addVisitedViews (view) {
            if (view.meta.hidden) return
            if (this.visitedViews.some((v) => v.path === view.path)) return
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || 'no-name'
                })
            )
        },
        delVisitedViews (view) {
            return new Promise((resolve) => {
                this.visitedViews.forEach((item, index) => {
                    if (item.path === view.path) this.visitedViews.splice(index, 1)
                })
                resolve([...this.visitedViews])
            })
            
        },
    },
})

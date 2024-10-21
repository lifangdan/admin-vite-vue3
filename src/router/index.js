import { createRouter, createWebHistory } from 'vue-router'
import { routes, baseRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...baseRoutes]
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
      next('/login')
  } else {
      next()
  }
})

export default router

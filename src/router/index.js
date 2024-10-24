import { createRouter, createWebHistory } from 'vue-router'
import { routes, baseRoutes } from './routes'
import { getCookie } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...baseRoutes]
})

router.beforeEach((to, from, next) => {
  const token = getCookie('token')
  if (!token && to.path !== '/login') {
      next('/login')
  } else {
      next()
  }
})

export default router

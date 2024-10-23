import stationManage from './modules/station-manage'

export const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/index'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/index'),
                meta: {
                    title: '首页',
                    icon: 'shouye',
                    keepAlive: true
                }
            },
            {
                path: '/table',
                name: 'Table',
                component: () => import('../views/table'),
                meta: {
                    title: '表格传url',
                    icon: 'tishi',
                    keepAlive: true
                },
            },
            {
                path: '/table2',
                name: 'Table2',
                component: () => import('../views/table/table2'),
                meta: {
                    title: '表格传data',
                    icon:'tishi'
                },
            },
            {
                path: '/test',
                name: 'Test',
                component: () => import('@/views/home/test'),
                meta: {
                    title: '测试',
                    hidden: true
                }
            },
            {
                path: '/test4',
                name: 'Test4',
                component: () => import('@/views/home/test'),
                meta: {
                    title: 'VUE2写法',
                    icon:'tishi'
                }
            },
            ...stationManage,
        ]
    }
]

export const baseRoutes = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "@/views/login/login")
    },
    {
        path: '/404',
        component: () => import('@/layout/index'),
        children: [
            {
                path: '',
                name: '404',
                component: () => import('@/views/error-pages/404')
            }
        ]
    },
    {
        path: '/403',
        component: () => import('@/layout/index'),
        children: [
            {
                path: '',
                name: '403',
                component: () => import('@/views/error-pages/403')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]
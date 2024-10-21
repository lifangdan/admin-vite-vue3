
/* 用于区分其他模块 */
const namespace = 'stationManage'
/* 路由路径 */
const routePath = '/station-manage'
/* 模块主目录 */
// const basePath = 'station-manage'
export default [
    {
        path: routePath,
        name: namespace,
        meta: {
            title: '一级菜单',
            icon:'tishi'
        },
        children: [
            {
                path: `${routePath}/test`,
                name: `${namespace}Test`,
                component: () => import('@/views/station-manage/index'),
                meta: {
                    title: '二级菜单1'
                },
            },
            {
                path: `${routePath}/detail`,
                name: `${namespace}Detail`,
                component: () => import('@/views/station-manage/detail'),
                meta: {
                    title: '详情内页',
                    hidden: true,
                    activeMenu:`${routePath}/test`
                },
            },
            {
                path: `${routePath}/test3`,
                name: `${namespace}Test3`,
                component: () => import('@/views/station-manage/index'),
                meta: {
                    title: '二级菜单2'
                },
            },
            {
                path: `${routePath}/test2`,
                name: `${namespace}Test2`,
                meta: {
                    title: '二级菜单3'
                },
                children: [
                    {
                        path: `${routePath}/test4`,
                        name: `${namespace}Test4`,
                        component: () => import('@/views/station-manage/index'),
                        meta: {
                            title: '三级菜单1'
                        },
                    }
                ]
            },
        ]
    },
]
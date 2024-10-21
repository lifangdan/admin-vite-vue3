// 应用具体配置
export default {
    sysName: '物联网平台',
    // session有效时间 ms
    sessionDuration: 30 * 60 * 1000,
    routeMode: 'hash',
    size: 'default',
    authPath: import.meta.env.VUE_APP_authpath ? import.meta.env.VUE_APP_authpath : '', // 统一认证地址
    useMock: false, // 是否使用mock数据
    apiPath: import.meta.env.VITE_APP_apipath ? import.meta.env.VITE_APP_apipath : '', // 接口服务器路径
    accessToken: 'token',
    apiBase: '/mgr/v1',
}

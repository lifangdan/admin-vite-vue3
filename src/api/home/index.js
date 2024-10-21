import fetch from '@/utils/fetch'
// const baseUrl = '/mgr/v1'
import config from '@/config'

// export default {
//     // 验证码
//     getCaptcha (params) {
//         return fetch(`${basePath}/auth/captcha`, params, {
//             method: 'post'
//         });
//     },
// };

export function getList (params) {
    return fetch(`${config.apiBase}/page`, params, {
        method: 'post'
    })
}
export function addList (params) {
    return fetch(`${config.apiBase}/add`, params, {
        method: 'post'
    })
}
export function updateList (params) {
    return fetch(`${config.apiBase}/update`, params, {
        method: 'post'
    })
}
export function deleteList (id) {
    return fetch(`${config.apiBase}/delete/${id}`, {}, {
        method: 'delete'
    })
}
export function login (params) {
    return fetch(`${config.apiBase}/login`, params, {
        method: 'post'
    })
}



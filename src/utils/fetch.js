/**
 * 封装请求
 */
import axios from 'axios'
import qs from 'qs'
// import config from '@/config'
import { getCookie } from '@/utils'
import { ElMessage } from 'element-plus';

let abortControllerList = []
export const abortAllFetch = (url) => {
    abortControllerList.forEach((item) => {
        if (url) {
            if (item.url.includes(url)) {
                item.abortController.abort()
            }
        } else {
            item.abortController.abort()
        }
    })
}
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 35000,
    headers: {
        Accept: '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
const formatErrorMessage = (respData) => {
    // 下载url返回的是string,需要转换
    if (typeof respData === 'string') {
        respData = JSON.parse(respData)
    }

    let msg = ''

    if (respData) {
        if (respData.msg) {
            msg = respData.msg
        } else if (respData.message) {
            msg = respData.message
        }
    }

    return msg && msg.length <= 50 ? msg : '服务器错误'
}

// 拦截请求
instance.interceptors.request.use(
    function (req) {
        const token = getCookie('token')
        const abortController = new AbortController()
        abortControllerList.push({
            abortController: abortController,
            url: req.url
        })
        req.signal = abortController.signal

        if (token) {
            req.headers['token'] = token
        }
        return req
    },
    function (err) {
        ElMessage.error(err)
        return Promise.reject(err)
    }
)
// 拦截返回
instance.interceptors.response.use(
    function (res) {
        return res.data
    },
    function (err) {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    
                    break
                case 401: // 返回 401 清除token信息并跳转到登录页面
                    
                    break
                case 404:
                    ElMessage.error(`404 ${err.response.message}`)
                    break
                default:
                    ElMessage.error(formatErrorMessage(err.response.data))
                    break
            }
        } else if (err.code === 'ERR_CANCELED') {
            return Promise.reject(new Error('Abort'))
        } else if (typeof err.message === 'string' && !err.message.includes('timeout')) {
            ElMessage.error(err)
        } else {
            console.error('[Axios Error]:', err)
        }
        return Promise.reject(err)
    }
)

export default async (url = '', nowParams = {}, option = {}) => {
    // 判断传值是否为空
    let params = {}
    if (option.method === 'postForm' || option.method === 'upload') {
        params = nowParams
    } else {
        for (let key in nowParams) {
            if (nowParams[key] || nowParams[key] === 0) {
                params[key] = nowParams[key]
            }
        }
    }
    if (!url) {
        return Promise.reject(new Error(`params 'url' not exist！`))
    }
    let method = option.method || 'post'
    // if (url.indexOf('http') !== 0) {
    //     let prefix = option.local ? '' : config.apiPath
    //     if (typeof prefix === 'string') {
    //         url = prefix + url
    //     }
    // }
    switch (method) {
        case 'get':
            return instance.get(url, {
                params: params
            })
        case 'upload':
            return instance.post(url, params, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        case 'download':
            return instance.post(url, params, {
                responseType: 'blob'
            })
        case 'downloadBold':
            return instance.get(url, {
                params: params,
                responseType: 'blob' 
            })
        case 'downloadImg':
            return instance.get(url, {
                params: params,
                responseType: 'arraybuffer'
            })
        case 'postForm':
            return instance.post(url, qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        case 'postQuery':
            return instance.post(url, null, Object.assign(option, { params }))
        case 'post':
            return instance.post(url, nowParams, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        case 'putForm':
            return instance.put(url, qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        case 'put':
            return instance.put(url, params, {
                headers: {
                    'content-type': 'application/json'
                }
            })
        case 'patch':
            return instance.patch(url, params, option)
        case 'delete':
            return instance.delete(url, {
                params: params
            })
        default:
            return Promise.reject(new Error(`unknown request method '${method}'`))
    }
}

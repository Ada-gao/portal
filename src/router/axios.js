/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
import router from '../router/router'
import { getToken, setToken, removeToken } from '@/util/auth'
import { Message } from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({ showSpinner: false })// NProgress Configuration
let msg
// HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    if (store.getters.access_token) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
    }, error => {
        return Promise.reject(error)
    }
)
// HTTPresponse拦截
axios.interceptors.response.use(data => {
    NProgress.done()
    return data
}, error => {
    NProgress.done()
    let errMsg = error.toString()
    let code = errMsg.substr(errMsg.indexOf('code') + 5)

    //错误处理
    if (code === 400) {
        Message(res.data.message || res.data.error, 'error')
        return
    } else if (code === 401) {
        Message({
            message:'登录时间过期，请重新登录',
            type: 'error'
        })
        removeToken()
        router.replace({ path: '/login' })
    } else if (code === 403) {
        Message({
            message:'管理权限不足，请联系管理员',
            type: 'error'
        })
        router.replace({path: '/login'})
    } else if (code === 500) {
        Message({
            message: res.data.message || res.data.error,
            type: 'error'
        })
    } else {
        Message({
            message:'服务器被吃了⊙﹏⊙∥',
            type: 'error'
        })
        return
    }
    return Promise.reject(new Error(error))
})
export default axios

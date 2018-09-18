/**
 *
 * http配置
 *
 */
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router/router'
import { getToken, setToken, removeToken } from '@/util/auth'
import { Message } from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import Toast from '../components/alert/alert.js'
// 超时时间
axios.defaults.timeout = 15000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({ showSpinner: false })// NProgress Configuration
let msg
// HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    if (store.getters.access_token) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
    }, error => {
        return Promise.reject(error)
    }
)
// HTTPresponse拦截
axios.interceptors.response.use(response => {
    NProgress.done()
    const res = response.data
    if (res.code === 1) {
        Message({
            message: res.msg,
            type: 'error'
        })
        return Promise.reject(res)
    }
    return response
},error => {
    NProgress.done()
    let errMsg = error.toString()
    let code = errMsg.substr(errMsg.indexOf('code') + 5)
    const res = error.response
    if (!res || res.status === undefined) {
        router.replace({path: '/login'})
        return
    }
    if (code === 401) {
        Vue.prototype.$toast.show({
            text:'登录时间过期，请重新登录',
            type:'error'
        })
      removeToken()
      router.replace({ path: '/login' })
    } else if (code === 403) {
        Vue.prototype.$toast.show({
            text:'管理权限不足，请联系管理员',
            type:'error'
        })
        router.replace({path: '/login'})
    } else if (code === 500) {
        Vue.prototype.$toast.show({
            text:res.data.message || res.data.error,
            type:'error'
        })
    } else {
        Vue.prototype.$toast.show({
            text:res.data.msg || res.data.error_description || '服务器被吃了⊙﹏⊙∥',
            type:'error'
        })
    }
    return Promise.reject(error)
})
export default axios

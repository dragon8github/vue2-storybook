import Qs from 'qs'
import store from '@/store'
import router from "@/router"
import axios from 'axios'

import { dateYYYYMMDDHHmmss, logs, maybe, throttle, isString, isObject, obj2formdata } from './utils.js'
import { removeCookie } from "@/utils/cookie"
import { Message } from 'element-ui'

const __API__ = process.env.NODE_ENV === 'development' ? '/api/' : '/dls-map/visual/'

// 请求队列
let pending = []

// 清空队列
window.$killPedding = function (msg) {
    // 取消所有接口的请求
    pending.forEach(_ => _.cancel(msg))
    // 清空接口
    pending = []
}

// 登陆状态失效，弹出错误提示并且跳转到登陆页面
const tokenError = (message = '请先登录') => {
    store.state.AppData.token = null
    removeCookie('token')
    Message(message)
    router.push('/login')
    throw new Error(message)
}

const getCommonParams = () => {
    // 从vuex中获取当前日月报类型
    const reportType = store.state.reportType
    // 目前只要月报
    const [startTime, endTime] = store.state.reportMonth 
    // 开始和结束时间（企业画像的项目不需要公共时间，先取消）
    return { /* startTime, endTime */ } 
}

// 函数节流，3秒之内只会执行一次。不会重复执行。
// leading 为 true时，第一次执行立即触发，这比setTimeout好多了
// trailing 为 fasle时，不会触发最后一次。这样比较符合直觉。
const _tokenError = throttle(tokenError, 3000, { leading: true, trailing: false })

// 添加请求拦截器，动态设置参数
axios.interceptors.request.use(config => {
    // 判断是否登录（登录接口本身除外）
    // if (!config.url.includes('login') && !store.state.AppData.token && !config.url.includes('/admin/yuezhengyi/auth/getState/middle-screen')) {
    //     // 登陆状态失效，弹出错误提示并且跳转到登陆页面
    //     _tokenError()
    // }

    // 合并请求头 authority-token
    config.headers = Object.assign({}, config.headers, { 'authority-token': store.state.AppData.token || '' })

    // news: 加入全局参数
    // fixbug: data 可能是字符串
    if (isObject(config.data)) {
        config.data.params = Object.assign({}, getCommonParams(), config.data.params)
    }

    // 获取参数详情
    let { method, params, data = {}, noRepeat = true } = config

    // fixbug: 由于设计失误「也为了友好」，noRepeat 可以从第三个参数进来，也可以在 data 里边一起进来
    const _noRepeat = data.noRepeat || noRepeat

    // 获取索引
    const [url, note] = config.url.split('|')

    // 以防万一，记录一下带有注释的 url
    config.noteURL = config.url

    // 过滤url的文本注释
    config.url = url + '?id=' + data.id

    // 加入备注
    config.__NOTE__ = note || ''

    // （默认开启「去重」）如果需要去重复, 则中止队列中所有相同请求地址的 xhr
    // 🔔 请注意，我这里故意使用「config.noteURL」，因为我要利用 「"|" 注释」来区分相同的 api
    // 「新认知」取消以后，接口的数据返回 null。所以逻辑依然会继续往下走。
    _noRepeat === true && pending.forEach(_ => _.url === config.noteURL && _.cancel('⚔️ kill repeat xhr：' + config.noteURL))

    // 配置 CancelToken
    config.cancelToken = new axios.CancelToken(cancel => {
        // 移除所有中止的请求，并且将新的请求推入缓存
        pending = [...pending.filter(_ => _.url != config.noteURL), { url: config.noteURL, cancel }]
    })

    // 返回最终配置
    return config
})

// 响应拦截器
axios.interceptors.response.use(
    res => {
        // 如果需要打印日志的话
        if (true) {
            // 获取请求配置
            const { method, url, params, data, status, __NOTE__ } = res.config
            // 获取参数
            const p = JSON.stringify(method === 'get' ? params : data)
            // 获取请求时间
            const date = dateYYYYMMDDHHmmss(Date.now())
            // 打印请求结果和详情
            logs(`${__NOTE__}${method.toUpperCase()}：${url}`, res.data, JSON.stringify({ params: method === 'get' ? params : data, result: res.data, status }, null, '\t'))
        }

        // 成功响应之后清空队列中所有相同Url的请求
        pending = pending.filter(_ => _.url != res.config.noteURL)

        // 只返回 data 即可
        return res.data
    },
    error => {
        // 获取报文
        const res = error.response

        // token 失效，请求失败 20019
        if (res && res.status === 500 && res.data && res.data.code === 20019) {
            window.$killPedding('⚠️登录状态失效')
            // 主动报错，回到登录页
            return _tokenError(res.data.message)
        }

        // 如果存在报文，才进行清空。
        if (res) {
            // 直接清空列表
            pending = pending.filter(_ => _.id != res.config.id)
        }

        // 可以输出：error.response
        return Promise.reject(error)
    }
)

export const GET = (url = '', params = {}, config = {}) => axios({ method: 'GET', url: __API__ + url, params, ...config })
export const POST = (url = '', data = {}, config = {}) => axios({ method: 'POST', url: __API__ + url, data, ...config })
export const FORM_POST = (url = '', data = {}, config = {}) => axios({ method: 'POST', url: __API__ + url, data: Qs.stringify(data), headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, ...config })
export const PURE_FORM_POST = (url = '', data = {}, config = {}) => axios({ method: 'POST', url: url, data: Qs.stringify(data), headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, ...config })

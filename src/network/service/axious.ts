import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
const IS_DEVELOP = ['development'].includes(import.meta.env.MODE) // 判断是否是开发环境

const service = axios.create({
  baseURL: IS_DEVELOP ? '' : import.meta.env.VITE_APP_API_URL,
  timeout: 5000,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在此处添加请求头等，如添加 token
    // if (store.state.token) {
    // config.headers['Authorization'] = `Bearer ${store.state.token}`
    // }
    config.headers['Cache-Control'] = 'no-cache'
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.headers['content-disposition']) {
      return response
    }
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(new Error(response.data.msg || 'Error'))
    }
  },
  (error: any) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '用户未授权'
          ElMessageBox.alert('认证失效，请重新登录', '', {
            confirmButtonText: '确定',
            type: 'warning',
            showClose: false,
            center: true,
            callback: () => {
              let _url = window.location.origin
              window.location.href = error.response.data.loginPageUrl + '?redirect_url=' + _url
            }
          })
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 405:
          error.message = '请求方法未允许(405)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器内部错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接错误: ${error.message}`
      }
    } else {
      if (error.message == 'Network Error') error.message == '网络异常，请检查后重试！'
      error.message = '连接到服务器失败，请联系管理员'
    }
    ElMessage(error.message)
    return Promise.reject(error)
  }
)
export default service

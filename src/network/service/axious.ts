import axios from 'axios'
import { ElMessageBox } from 'element-plus'

const service = axios.create({
  timeout: 30000,
  baseURL: import.meta.env.MODE === 'development' ? '' :import.meta.env.VITE_APP_API_URL
})

// 发起请求前的处理
service.interceptors.request.use(config => {
  config.headers['Cache-Control'] = 'no-cache'
  return config
}, error => {
  return Promise.reject(error)
})

// 收到响应的处理
service.interceptors.response.use(response => {
  if (response.headers['content-disposition']) {
    return response
  }
  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') > -1) {
    return Promise.reject(new Error('请求超时'))
  }
  const err = error.response.data
  const status = error.response.status
  let errMsg = ''
  if (err.errors) {
    let errArr = []
    for (let k in err.errors) {
      errArr.push(err.errors[k].toString())
    }
    errMsg = errArr.toString()
  } else {
    errMsg = err.msg
  }
  switch (status) {
    case 401:
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
    default:
      if (!errMsg) {
        errMsg = '当前网络环境较差，请刷新重试'
      }
      return Promise.reject(new Error(errMsg))
  }
})

export default service

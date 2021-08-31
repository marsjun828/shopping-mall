import axios from 'axios'

export function request(config) {
  // 1.创建网络实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.创建请求的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 3.创建响应的拦截器
  instance.interceptors.response.use(config => {
    return config.data
  }, err => {

  })

  // 4.发送请求
  return instance(config)
}
// Home.vue所有的请求封装
import { request } from './request'

// 获取Home页的多个数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取Home页的商品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
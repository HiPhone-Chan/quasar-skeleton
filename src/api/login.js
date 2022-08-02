import request from '@/utils/request'

export function login(data) {
  return request({ url: '/api/authenticate', method: 'post', data })
}

export { getCurrentAccount as getInfo } from './account'

export function logout() {
  // return request({url: '/login/logout', method: 'post'})
  return Promise.resolve()
}

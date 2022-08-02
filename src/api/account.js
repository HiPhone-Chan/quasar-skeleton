import request from '@/utils/request'

export function getCurrentAccount() {
  return request.get('/api/account')
}

export function updateAccount(data) {
  return request.post('/api/account', data)
}

export function changePassword(data) {
  return request.post('/api/account/change-password', data)
}

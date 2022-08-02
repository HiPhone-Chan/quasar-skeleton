import request from '@/utils/request'

export function createUser(userVM) {
  return request.post('/api/admin/user', userVM)
}

export function updateUser(userVM) {
  return request.put('/api/admin/user', userVM)
}

export function deleteUser(login) {
  return request.delete(`/api/admin/user/${login}`)
}

export function getUsers(query) {
  return request.get('/api/admin/users', { params: query })
}

export function checkUserLogin(login) {
  return request.get(`/api/admin/user/check/${login}`)
}

export function getUserAuthorities() {
  return request.get('/api/admin/user/authorities')
}

export function changePassword(login, changePasswordVM) {
  return request.post(`/api/admin/user/change-password/${login}`, changePasswordVM)
}


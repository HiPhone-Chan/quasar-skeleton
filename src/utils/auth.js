import { getStorage } from './global'
const TokenKey = 'Admin-Token'

export function getToken() {
  return getStorage('sessionStorage').getItem(TokenKey)
}

export function setToken(token) {
  getStorage('sessionStorage').setItem(TokenKey, token)
}

export function removeToken() {
  getStorage('sessionStorage').removeItem(TokenKey)
}

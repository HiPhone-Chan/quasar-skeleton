import { getStorage } from './global'
const TokenKey = 'Admin-Token'

const storageType = 'cookies';
// const storageType = 'sessionStorage';

export function getToken() {
  const storage = getStorage(storageType)
  // console.log('getToken', storage)
  return storage.getItem(TokenKey)
}

export function setToken(token) {
  const storage = getStorage(storageType)
  storage.setItem(TokenKey, token)
}

export function removeToken() {
  getStorage(storageType).removeItem(TokenKey)
}

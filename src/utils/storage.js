import { LocalStorage, SessionStorage, Cookies } from 'quasar'

const defaultStorage = {
  cache: {},

  getItem(key) {
    return this.cache[key]
  },
  setItem(key, value) {
    this.cache[key] = value
  },
  removeItem(key) {
    delete this.cache[key]
  }
}


class MyCookies {
  constructor(cookies) {
    this.cookies = cookies
  }

  getItem(key) {
    return this.cookies.get(key)
  }
  setItem(key, value) {
    this.cookies.set(key, value, { path: '/' })
  }
  removeItem(key) {
    this.cookies.remove(key, { path: '/' })
  }
}

class MyWebStorage {
  constructor(webStorage) {
    this.webStorage = webStorage
  }

  getItem(key) {
    return this.webStorage.getItem(key)
  }
  setItem(key, value) {
    this.webStorage.set(key, value)
  }
  removeItem(key) {
    this.webStorage.remove(key)
  }

}

export function getStorage(name, ssrContext) {
  switch (name) {
    case 'localStorage': return new MyWebStorage(LocalStorage);
    case 'sessionStorage': return new MyWebStorage(SessionStorage)
    case 'cookies':
      if (process.env.SERVER) {
        if (ssrContext) {
          return new MyCookies(Cookies.parseSSR(ssrContext))
        }
      } else {
        return new MyCookies(Cookies)
      }
    default:
  }
  return defaultStorage;
}

import { LocalStorage, SessionStorage, Cookies } from 'quasar'

// wrap persist storage object with function setItem and getItem, removeItem for object(not string only)
// undefined to removeItem
export function persistPlugin(ssrContext) {
  return function ({ options, store }) {
    const persistOj = options.persist
    if (!persistOj) {
      return
    }

    const storeId = store.$id
    store.$patch((state) => {
      if (state) {
        Object.keys(persistOj).forEach((key) => {
          const storeKey = `${storeId}-${key}`
          const storage = getStorage(persistOj[key]?.storage)
          state[key] = storage?.getItem(storeKey) ?? state[key]
        })
      }
    })

    // events id DEV ONLY!
    store.$subscribe((mutation, state) => {
      Object.keys(persistOj).forEach((key) => {
        const storeKey = `${storeId}-${key}`
        const storage = getStorage(persistOj[key]?.storage)
        const value = state[key]
        if (undefined == value) {
          storage?.removeItem(storeKey)
        } else {
          storage?.setItem(storeKey, value)
        }
      })
    })
  }

  function getStorage(name) {
    switch (name) {
      case 'localStorage':
        return new MyWebStorage(LocalStorage)
      case 'sessionStorage':
        return new MyWebStorage(SessionStorage)
      case 'cookies':
        return new MyCookies(ssrContext ? Cookies.parseSSR(ssrContext) : Cookies)
      default:
    }
    throw `Cannot find storage for ${name}`
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

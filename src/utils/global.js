

const defaultStorage = {
  cache: {},

  getItem(key) {
    return this.cache[key]
  },
  setItem(key, value) {
    this.cache[key] = value
  }
}

export function getStorage(name) {
  let storage;
  switch (name) {
    case 'localStorage':
      storage = getGlobal().localStorage;
      break;
    case 'sessionStorage':
      storage = getGlobal().sessionStorage;
      break;
    default:
  }

  if (!storage) {
    storage = defaultStorage;
  }
  return storage;
}

export function getLocalLanguage() {
  if (process.env.SERVER) {
  } else {
    if (navigator) {
      return (navigator.language || navigator.browserLanguage);
    }
  }

  return 'zh-CN'
}

export function getGlobal() {
  if (globalThis) {
    return globalThis;
  }
  return window
  // return process.env.SERVER ? global : window
}

import { getStorage } from '@/utils/storage'

// wrap persist storage object with function setItem and getItem, removeItem for object(not string only)
// undefined to removeItem
export function persistPlugin(ssrContext) {

  return function ({ options, store }) {
    const persistOj = options.persist;
    if (!persistOj) {
      return
    }

    const storeId = store.$id
    store.$patch((state) => {
      if (state) {
        Object.keys(persistOj).forEach((key) => {
          const storeKey = `${storeId}-${key}`
          const storage = getStorage(persistOj[key]?.storage, ssrContext);
          state[key] = storage?.getItem(storeKey) ?? state[key];
        })
      }
    })

    // events id DEV ONLY!
    store.$subscribe((mutation, state) => {
      Object.keys(persistOj).forEach((key) => {
        const storeKey = `${storeId}-${key}`
        const storage = getStorage(persistOj[key]?.storage, ssrContext);
        const value = state[key];
        if (undefined == value) {
          storage?.removeItem(storeKey);
        } else {
          storage?.setItem(storeKey, value);
        }
      })
    })
  }

}

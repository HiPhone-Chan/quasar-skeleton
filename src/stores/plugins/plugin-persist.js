
// wrap persist storage object with function setItem and getItem, removeItem for object(not string only)
// undefined to removeItem
export function persistPlugin({ options, store }) {
  const persistOj = options.persist;
  if (!persistOj) {
    return
  }

  const storeId = store.$id
  store.$patch((state) => {
    Object.keys(persistOj).forEach((key) => {
      const storeKey = `${storeId}-${key}`
      const storage = persistOj[key]?.storage;
      let value = storage?.getItem(storeKey);
      if (undefined == value) {
        value = persistOj[key]?.default;
      }
      state[key] = value;
    })
  })

  // events id DEV ONLY!
  store.$subscribe((mutation, state) => {
    Object.keys(persistOj).forEach((key) => {
      const storeKey = `${storeId}-${key}`
      const storage = persistOj[key]?.storage;
      const value = state[key];
      if (undefined == value) {
        storage?.removeItem(storeKey);
      } else {
        storage?.setItem(storeKey, state[key]);
      }
    })
  })

}


// wrap persist storage object with function setItem and getItem for object(not string only)
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
      state[key] = storage?.getItem(storeKey);
    })
  })

  // events id DEV ONLY!
  store.$subscribe((mutation, state) => {
    Object.keys(persistOj).forEach((key) => {
      const storeKey = `${storeId}-${key}`
      const storage = persistOj[key]?.storage;
      storage?.setItem(storeKey, state[key]);
    })
  })

}

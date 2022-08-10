
export function persistPlugin({ options, store }) {
  const persistOj = options.persist;
  if (!persistOj) {
    return
  }

  const storageResult = {}
  Object.keys(persistOj).forEach((key) => {
    storageResult[key] = persistOj[key]?.get();
  })
  store.$patch(storageResult)

  store.$subscribe((mutation) => {
    const events = mutation?.events
    const value = events?.newValue
    const key = events?.key
    persistOj[key]?.save(value);
  })

}

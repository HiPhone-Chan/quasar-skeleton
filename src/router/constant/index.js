const routerModules = import.meta.glob('./**.js', { eager: true })
const routers = []

Object.keys(routerModules).forEach((key) => {
  const importRouters = routerModules[key].default
  const priority = routerModules[key].priority
  if (Array.isArray(importRouters)) {
    for (const importRouter of importRouters) {
      routers.push({
        router: importRouter,
        priority: priority,
      })
    }
  } else {
    routers.push({
      router: importRouters,
      priority: priority,
    })
  }
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default routers
  .sort((ra, rb) => {
    return ra.priority - rb.priority // 升序
  })
  .map((item) => item.router)

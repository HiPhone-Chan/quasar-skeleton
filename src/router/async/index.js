const routerModules = import.meta.globEager('./**.js')
const routers = []

Object.keys(routerModules).forEach(key => {
  routers.push({
    router: routerModules[key].default,
    priority: routerModules[key].priority
  })
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default routers.sort((ra, rb) => {
  return ra.priority - rb.priority // order asc
}).map(item => item.router)

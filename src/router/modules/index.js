const routerModules = import.meta.globEager('./**.js')
const routers = []

Object.keys(routerModules).forEach(key => {
  routers.push(routerModules[key].default)
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default routers

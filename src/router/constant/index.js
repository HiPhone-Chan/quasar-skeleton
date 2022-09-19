const routerModules = import.meta.globEager('./**.js')
const routers = []

Object.keys(routerModules).forEach(key => {
  const importRouteres = routerModules[key].default;
  if (Array.isArray(importRouteres)) {
    routers.push(...importRouteres)
  } else {
    routers.push(importRouteres)
  }
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default routers

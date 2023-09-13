import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router/routes';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
export function hasPermission(roles, route) {
  const routeRoles = route?.meta?.roles
  if (routeRoles ==  false) {
    return true;
  } else if (routeRoles && routeRoles.length) {
    return roles.some(role => routeRoles.includes(role))
  }
  return false;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: []
  }),
  actions: {
    async generateRoutes(roles) {
      let accessedRoutes
      if (roles.includes('ROLE_ADMIN')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    }
  }
})

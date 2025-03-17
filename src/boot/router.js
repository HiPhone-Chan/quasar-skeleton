import { defineBoot } from '#q-app/wrappers'
import defaultSettings from '@/settings'
import { useTitle } from '@vueuse/core'
import { useAppStore } from '@/stores/app-store'
import { useUserStore } from '@/stores/user-store'
import { usePermissionStore, hasPermission } from '@/stores/permission-store'
import { useTagsViewStore } from '@/stores/tags-view-store'
import { generateTitle } from '@/utils/i18n'

const title = defaultSettings.title || 'App'

export default defineBoot(async ({ router, store }) => {
  const appStore = process.env.SERVER ? useAppStore(store) : useAppStore()
  const tagsViewStore = process.env.SERVER ? useTagsViewStore(store) : useTagsViewStore()

  router.beforeEach(async (to, from, next) => {
    const userStore = process.env.SERVER ? useUserStore(store) : useUserStore()
    const permissionStore = process.env.SERVER ? usePermissionStore(store) : usePermissionStore()
    // start progress bar
    appStore.loading(true)
    // set page title
    setTitle(getPageTitle(to?.meta?.title))
    // determine whether the user has logged in
    const hasToken = userStore.token

    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = userStore.roles?.length > 0
        if (hasRoles) {
          if (hasPermission(userStore.roles, to)) {
            next()
          } else {
            tagsViewStore.delAllVisitedViews()
            tagsViewStore.delAllCachedViews()
            next({ path: '/' })
          }
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await userStore.getInfo()
            // generate accessible routes map based on roles
            const accessRoutes = await permissionStore.generateRoutes(roles)
            // dynamically add accessible routes
            for (const accessRoute of accessRoutes) {
              router.addRoute(accessRoute)
            }

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            console.error('Get roles', error)
            await userStore.resetToken()
            next(`/login?redirect=${to.path}`)
          }
        }
      }
    } else {
      /* has no token*/
      if (to?.meta?.roles === false) {
        // not need roles, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  })

  router.afterEach(() => {
    // finish progress bar
    appStore.loading(false)
  })
})

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${generateTitle(pageTitle)} - ${title}`
  }
  return `${title}`
}

function setTitle(title) {
  if (process.env.CLIENT) {
    useTitle(title)
  }
}

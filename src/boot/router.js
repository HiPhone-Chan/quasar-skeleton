import { boot } from 'quasar/wrappers'
import { getPageTitle, setTitle } from '@/utils/page-title'
import { useEventStore } from '@/stores/event-store'
import { useUserStore } from '@/stores/user-store'
import { usePermissionStore } from '@/stores/permission-store'

export default boot(async ({ app, router, store }) => {
  const eventStore = process.env.SERVER ? useEventStore(store) : useEventStore();

  router.beforeEach(async (to, from, next) => {
    const userStore = process.env.SERVER ? useUserStore(store) : useUserStore();
    const permissionStore = process.env.SERVER ? usePermissionStore(store) : usePermissionStore();
    // start progress bar
    useEventStore().setLoading(true)
    // set page title
    setTitle(getPageTitle(to?.meta?.title))
    // determine whether the user has logged in
    const hasToken = userStore.token

    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        eventStore.setLoading(false)
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = userStore.roles?.length > 0
        if (hasRoles) {
          next()
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
            eventStore.setNotification({
              text: error || 'Has Error',
              type: 'error'
            })
            next(`/login?redirect=${to.path}`)
            eventStore.setLoading(false)
          }
        }
      }
    } else {
      /* has no token*/
      if (!to?.meta?.roles) {
        // not need roles, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        eventStore.setLoading(false)
      }
    }
  })

  router.afterEach(() => {
    // finish progress bar
    eventStore.setLoading(false)
  })
})

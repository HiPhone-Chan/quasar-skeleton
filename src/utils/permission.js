
import Router, { resetRouter } from '@/router'
import { useUserStore } from '@/stores/user-store'
import { logout as apiLogout } from '@/api/login';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStore().roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export async function logout() {
  const userStore = useUserStore();
  await apiLogout(userStore.token)
  await userStore.resetToken()
  resetRouter(Router)
}

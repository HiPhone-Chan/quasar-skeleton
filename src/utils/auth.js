import { login as apiLogin, logout as apiLogout } from '@/api/login'
import Router, { resetRouter } from '@/router'
import { useUserStore } from '@/stores/user-store'

// user login
export async function login(userInfo) {
  const userStore = useUserStore();
  const { username, password } = userInfo
  const response = await apiLogin({ username: username, password: password })
  const { data } = response
  userStore.token = data.id_token
}

// user logout
export async function logout() {
  const userStore = useUserStore();
  await apiLogout(userStore.token)
  await userStore.resetToken()
  resetRouter(Router)
}

import { defineStore, acceptHMRUpdate } from 'pinia';
import { login, logout, getInfo } from '@/api/login'
import Router, { resetRouter } from '@/router'
import defaultAvatar from '@/assets/avatar.gif'

const storageType = 'cookies';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    name: '',
    nickname: '',
    mobile: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  getters: {
  },
  actions: {
    // user login
    async login(userInfo) {
      const { username, password } = userInfo
      const response = await login({ username: username, password: password })
      const { data } = response
      this.token = data.id_token
    },

    // get user info
    async getInfo() {
      const response = await getInfo(this.token)
      const { data } = response

      if (!data) {
        throw 'Verification failed, please Login again.'
      }

      data.roles = data.authorities
      const { roles, login, nickName, imageUrl, mobile, introduction } = data
      const name = login
      const avatar = imageUrl

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        throw 'getInfo: roles must be a non-null array!'
      }

      this.roles = roles
      this.name = name
      this.nickname = nickName
      this.mobile = mobile
      this.avatar = avatar || defaultAvatar
      this.introduction = introduction
      return data
    },

    // user logout
    async logout() {
      await logout(this.token)
      await this.resetToken()
      resetRouter(Router)
    },

    // remove token
    async resetToken() {
      this.token = undefined
      this.roles = []
    }

  },
  persist: {
    token: {
      storage: storageType
    }
  }
});

// https://pinia.vuejs.org/cookbook/hot-module-replacement.html
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

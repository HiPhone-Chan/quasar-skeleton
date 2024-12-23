import { defineStore, acceptHMRUpdate } from 'pinia'
import { getInfo } from '@/api/login'
import defaultAvatar from '@/assets/avatar.gif'

const storageType = 'cookies'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    name: '',
    nickname: '',
    mobile: '',
    avatar: '',
    introduction: '',
    roles: [],
  }),
  getters: {},
  actions: {
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

    // remove token
    async resetToken() {
      this.token = undefined
      this.roles = []
    },
  },
  persist: {
    token: {
      storage: storageType,
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

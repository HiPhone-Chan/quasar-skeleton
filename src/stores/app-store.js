import { defineStore } from 'pinia';
import { getLanguage } from '@/i18n/index'
import { getStorage } from '@/utils/global'

const storageType = 'cookies';

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    notification: { // 消息提醒
      message: "",
      type: "" // 消息提醒类型
    },
    language: getLanguage(),
    size: 'medium'
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading
    },
    setNotification(notification) {
      this.notification = notification
    },
    setLanguage(language) {
      this.language = language
    },
    setSize(size) {
      this.size = size
    }
  },
  persist: {
    language: {
      storage: getStorage(storageType),
      default: getLanguage()
    },
    size: {
      storage: getStorage(storageType),
      default: 'medium'
    }
  }
})

import { defineStore } from 'pinia';
import { getLanguage } from '@/i18n/index'
import { getStorage } from '@/utils/global'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    message: { // 消息提醒
      text: "",
      type: "" // 消息提醒类型
    },
    language: getLanguage(),
    size: 'medium'
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading
    },
    setMessage({ type, message }) {
      this.message = { type, text: message }
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
      save(value) {
        getStorage('localStorage').setItem('language', value)
      },
      get() {
        return getStorage('localStorage').getItem('language')
      }
    },
    size: {
      save(value) {
        getStorage('localStorage').setItem('size', `${value}`)
      },
      get() {
        return getStorage('localStorage').getItem('size')
      }
    }
  }
})

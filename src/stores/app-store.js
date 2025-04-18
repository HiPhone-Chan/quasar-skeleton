import { defineStore, acceptHMRUpdate } from 'pinia'
import { getLanguage } from '@/i18n/index'

export const useAppStore = defineStore('app', {
  state: () => ({
    language: getLanguage(),
    size: 'medium',
    isLoading: false,
    navigateTransitionName: '', // 页面切换过度动画名称
  }),
  actions: {
    setLanguage(language) {
      this.language = language
    },
    setSize(size) {
      this.size = size
    },
    loading(isLoading = true) {
      this.isLoading = isLoading
    },
  },
  persist: {
    language: {
      storage: 'cookies',
    },
    size: {
      storage: 'cookies',
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

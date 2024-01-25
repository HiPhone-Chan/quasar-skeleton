import { defineStore, acceptHMRUpdate } from 'pinia';
import { getLanguage } from '@/i18n/index'

const storageType = 'cookies';

export const useAppStore = defineStore('app', {
  state: () => ({
    language: getLanguage(),
    size: 'medium'
  }),
  actions: {
    setLanguage(language) {
      this.language = language
    },
    setSize(size) {
      this.size = size
    }
  },
  persist: {
    language: {
      storage: storageType
    },
    size: {
      storage: storageType
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

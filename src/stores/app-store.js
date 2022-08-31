import { defineStore } from 'pinia';
import { getLanguage } from '@/i18n/index'
import { getStorage } from '@/utils/global'

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
    sidebar: {
      storage: getStorage(storageType),
      default: {
        opened: true,
        withoutAnimation: false
      }
    },
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

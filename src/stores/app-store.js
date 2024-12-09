import { defineStore, acceptHMRUpdate } from 'pinia'
import { getLanguage } from '@/i18n/index'

const storageType = 'cookies'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: getLanguage(),
    size: 'medium',
    isLoading: false,
  }),
  actions: {
    toggleSideBar() {
      this.sidebar = {
        opened: !this.sidebar.opened,
        withoutAnimation: false
      }
    },
    closeSideBar(withoutAnimation) {
      this.sidebar = {
        opened: false,
        withoutAnimation: withoutAnimation
      }
    },
    toggleDevice(device) {
      this.device = device
    },
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
    sidebar: {
      storage: storageType
    },
    language: {
      storage: storageType,
    },
    size: {
      storage: storageType,
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

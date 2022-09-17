import { defineStore } from 'pinia';
import { getLanguage } from '@/i18n/index'

const storageType = 'cookies';

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: getLanguage(),
    size: 'medium'
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
    }
  },
  persist: {
    sidebar: {
      storage: storageType
    },
    language: {
      storage: storageType
    },
    size: {
      storage: storageType
    }
  }
})

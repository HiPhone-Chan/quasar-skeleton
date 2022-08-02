import { defineStore } from 'pinia';
import { getLanguage } from '@/i18n/index'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    message: { // 消息提醒
      text: "",
      type: "" // 消息提醒类型
    },
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
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
      save(value) {
        localStorage.setItem('sidebarStatus', value.opened ? '1' : '0')
      },
      get() {
        return {
          opened: localStorage.getItem('sidebarStatus') === '1',
          withoutAnimation: false
        }
      }
    },
    language: {
      save(value) {
        localStorage.setItem('language', value)
      },
      get() {
        return localStorage.getItem('language')
      }
    },
    size: {
      save(value) {
        localStorage.setItem('size', `${value}`)
      },
      get() {
        return localStorage.getItem('size')
      }
    }
  }
})

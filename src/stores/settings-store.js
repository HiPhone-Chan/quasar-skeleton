import { defineStore, acceptHMRUpdate } from 'pinia'
import defaultSettings from '@/settings'
import variables from '@/css/element-variables.module.scss'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  }),
  actions: {
    changeSetting({ key, value }) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = value
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}

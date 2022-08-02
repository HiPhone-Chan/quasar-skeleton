import { defineStore } from 'pinia';
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...defaultSettings
  }),
  actions: {
    changeSetting({ key, value }) {
      if (this.hasOwnProperty(key)) {
        this[key] = value
      }
    }
  }
})

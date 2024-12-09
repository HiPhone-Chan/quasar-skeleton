import { defineStore } from 'pinia'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...defaultSettings,
  }),
  actions: {
    changeSetting({ key, value }) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = value
      }
    },
  },
})

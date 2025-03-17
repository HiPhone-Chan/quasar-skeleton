import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSettingsStore } from './settings-store'

const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error']
const MAX_LENGTH = 100

export const useLogStore = defineStore('log', {
  state: () => ({
    logs: [],
    clearCallbackFunc: function (logs) {
      // replace this func
      console.log(logs)
    },
  }),
  actions: {
    log(...params) {
      console.log(...params)
      let [tag, msg] = params
      if (msg === undefined) {
        msg = tag
        tag = null
      }
      this.$log('info', tag, msg)
    },
    debug(...params) {
      const [tag, msg] = params
      console.debug('[%s]\t%s', tag, msg)
      this.$log('debug', ...params)
    },
    info(...params) {
      const [tag, msg] = params
      console.info('[%s]\t%s', tag, msg)
      this.$log('info', ...params)
    },
    warn(...params) {
      const [tag, msg] = params
      console.warn('[%s]\t%s', tag, msg)
      this.$log('warn', ...params)
    },
    error(...params) {
      const [tag, msg] = params
      console.error('[%s]\t%s', tag, msg)
      this.$log('error', ...params)
    },
    clear() {
      const clearLogs = this.logs.splice(0)
      this.clearCallbackFunc(clearLogs)
    },
    $log(level, tag, msg, stack) {
      if (this.loggable(level)) {
        const time = new Date().getTime()
        this.logs.push({ level, tag, msg, stack, time })
        if (this.logs.length > MAX_LENGTH) {
          this.clear()
        }
      }
    },
    loggable(logLevel) {
      const settingLevel = useSettingsStore().logLevel
      return LOG_LEVELS.indexOf(logLevel) >= LOG_LEVELS.indexOf(settingLevel)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}

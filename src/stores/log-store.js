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
      this.$log({
        level: 'info',
        tag,
        msg,
      })
    },
    debug(tag, msg) {
      console.debug('[%s]\t%s', tag, msg)
      if (this.loggable('debug')) {
        this.$log({
          level: 'debug',
          tag,
          msg,
        })
      }
    },
    info(tag, msg) {
      console.info('[%s]\t%s', tag, msg)
      if (this.loggable('info')) {
        this.$log({
          level: 'info',
          tag,
          msg,
        })
      }
    },
    warn(tag, msg) {
      console.warn('[%s]\t%s', tag, msg)
      if (this.loggable('warn')) {
        this.$log({
          level: 'info',
          tag,
          msg,
        })
      }
    },
    error(tag, msg) {
      console.error('[%s]\t%s', tag, msg)
      if (this.loggable('error')) {
        this.$log({
          level: 'error',
          tag,
          msg,
        })
      }
    },
    clear() {
      const clearLogs = this.logs.splice(0)
      this.clearCallbackFunc(clearLogs)
    },
    $log({ level, tag, msg, stack }) {
      const time = new Date().getTime()
      this.logs.push({ level, tag, msg, stack, time })
      if (this.logs.length > MAX_LENGTH) {
        this.clear()
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

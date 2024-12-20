import { defineStore, acceptHMRUpdate } from 'pinia'

export const useErrorLogStore = defineStore('errorLog', {
  state: () => ({
    logs: [],
  }),
  actions: {
    addErrorLog(log) {
      this.logs.push(log)
    },
    clearErrorLog() {
      this.logs.splice(0)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorLogStore, import.meta.hot))
}

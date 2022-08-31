import { defineStore } from 'pinia';

// use for event bus
export const useEventStore = defineStore('event', {
  state: () => ({
    loading: false,
    notification: { // message notification
      message: "",
      type: "" // notification type
    }
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading
    },
    setNotification(notification) {
      this.notification = notification
    }
  }
})

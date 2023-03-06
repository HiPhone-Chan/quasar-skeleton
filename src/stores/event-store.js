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
    emit(event, data) { // event is state.prop name
      this[event] = data
    }
  }
})

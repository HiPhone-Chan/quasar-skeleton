import { defineStore } from 'pinia';

// use for event bus
export const useEventStore = defineStore('event', {
  state: () => ({
    loading: false,
    error: {
      type: "", // request
      info: null // error info
    }
  }),
  actions: {
    emit(event, data) { // event is state.prop name
      this[event] = data
    }
  }
})

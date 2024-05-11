import { defineStore } from 'pinia';

// use for event bus
export const useEventStore = defineStore('event', {
  state: () => ({
    loading: false
  }),
  actions: {
    emit(event, data) { // event is state.prop name
      this[event] = data
    }
  }
})

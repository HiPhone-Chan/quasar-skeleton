<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import messages from '@/i18n/index'
import 'default-passive-events' // 消除浏览器passive-events警告
import { mapState } from 'pinia'
import { useEventStore } from '@/stores/event-store'
import { useAppStore } from '@/stores/app-store'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState(useEventStore, ['loading', 'notification']),
    ...mapState(useAppStore, ['language']),
    locale() {
      return messages[this.language]
    }
  },
  watch: {
    loading(loading) {
      if (loading) {
        // start global loading
        this.$q.loading.show()
      } else {
        // finish global loading
        this.$q.loading.hide()
      }
    },
    notification: {
      deep: true,
      handler: function (val, oldVal) {
        // receive global notification message
        this.$q.notify(val)
      }
    }
  }
})
</script>

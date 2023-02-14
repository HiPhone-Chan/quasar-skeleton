<template>
  <van-config-provider style="height: 100%">
    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top />
    <router-view />
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </van-config-provider>
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
        this.$loading.show()
      } else {
        // finish global loading
        this.$loading.hide()
      }
    },
    notification: {
      deep: true,
      handler: function (val, oldVal) {
        // receive global notification message
        this.$notify(val)
      }
    }
  }
})
</script>

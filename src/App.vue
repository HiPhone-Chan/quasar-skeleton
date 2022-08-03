<template>
  <van-config-provider style="height: 100%">
    <router-view />
  </van-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import messages from '@/i18n/index'
import 'default-passive-events' // 消除浏览器passive-events警告
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/app-store'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState(useAppStore, ['loading', 'message', 'language']),
    locale() {
      return messages[this.language]
    }
  },
  watch: {
    loading(loading) {
      if (loading) {
        // start global loading
      } else {
        // finish global loading
      }
    },
    message: {
      deep: true,
      handler: function (val, oldVal) {
        // receive global message
      }
    }
  }
})
</script>

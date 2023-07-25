<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
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
    ...mapState(useEventStore, ['loading', 'error']),
    ...mapState(useAppStore, ['language']),
    locale() {
      return messages[this.language]
    }
  },
  watch: {
    loading(loading) { // global loading
      if (loading) {
        this.$loading.show()
      } else {
        this.$loading.hide()
      }
    },
    error(info) { // global error handle
      console.warn("resp err :" + JSON.stringify(error)); // for debug
      const error = info.error;
      switch (info.type) {
        case 'request':
          break;
        default:
          this.$message({
            type: 'error',
            message: error.info
          })
      }
    }
  }
})
</script>

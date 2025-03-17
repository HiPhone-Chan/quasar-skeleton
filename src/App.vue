<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { elLocale } from '@/i18n/index'
import 'default-passive-events' // 消除浏览器passive-events警告
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/app-store'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState(useAppStore, ['language', 'isLoading']),
    locale() {
      return elLocale[this.language]
    }
  },
  watch: {
    isLoading(loading) { // global loading
      if (loading) {
        this.$loading.show()
      } else {
        this.$loading.hide()
      }
    }
  },
  errorCaptured(err) {
    // 自定义的err结构 {
    //   type: "",
    //   info: null
    // }
    console.warn("handleError :", err); // for debug
    const type = err?.type
    let msgType = 'error'
    let message = 'Error not handled!'

    if (type !== undefined) {
      msgType = type;
      switch (type) {
        case 'request':
          break;
        default:
      }
      message = err.info
    }
    this.$message({
      type: msgType,
      message
    })

    // return false
  }
})
</script>

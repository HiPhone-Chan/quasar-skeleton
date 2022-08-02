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
import { useAppStore } from '@/stores/app-store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

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
        NProgress.start()
      } else {
        // finish global loading
        NProgress.done()
      }
    },
    message: {
      deep: true,
      handler: function (val, oldVal) {
        ElMessage({
          message: val.text,
          type: val.type,
        })
      }
    }
  }
})
</script>

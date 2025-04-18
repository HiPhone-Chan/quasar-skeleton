<template>
  <router-view v-slot="{ Component }">
    <transition :name="navigateTransitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'
import 'default-passive-events' // 消除浏览器passive-events警告
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/app-store'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState(useAppStore, ['language', 'isLoading', 'navigateTransitionName']),
  },
  watch: {
    language(lang) {
      this.$i18n.locale = lang
    },
    isLoading(loading) {
      // global loading
      if (loading) {
        this.$loading.show()
      } else {
        this.$loading.hide()
      }
    },
  },
  errorCaptured(err) {
    // 自定义的err结构 {
    //   type: "",
    //   info: null
    // }
    console.warn('handleError :', err) // for debug
    const type = err?.type
    let msgType = 'error'
    let message = 'Error not handled!'

    if (type !== undefined) {
      msgType = type
      switch (type) {
        case 'request':
          break
        default:
          message = err.info
      }
    }
    this.$notify({
      type: msgType,
      message,
    })

    // return false
  },
})
</script>

<style scoped>
/* TODO 定义页面切换的动画 */
.slide-enter-from {
  transform: translateX(100%);
  opacity: 1;
}

.slide-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: transform 1s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-leave-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-active {
  transform: translateX(-100%);
  opacity: 1;
  transition: transform 1s ease-in-out, opacity 0.3s ease-in-out;
}
</style>

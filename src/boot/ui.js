import { defineBoot } from '#q-app/wrappers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import NProgress from 'nprogress' // progress bar
// 导入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-alert.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'nprogress/nprogress.css' // progress bar style

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default defineBoot(async ({ app }) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(iconName(key), component)
  }

  app.use(ElMessage) // $message
  app.use(ElMessageBox) // $msgbox $alert $confirm $prompt
  app.use(ElNotification) // $notify
  app.use(ElLoading) // $loading and add v-loading
  const loading = app.config.globalProperties.$loading
  loading.show = function () {
    NProgress.start()
  }
  loading.hide = function () {
    NProgress.done()
  }
})

function iconName(key) {
  return key.replace(/[A-Z]/g, function (i) {
    return 'el-icon-' + i.toLowerCase()
  })
}

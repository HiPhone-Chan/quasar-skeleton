import { defineBoot } from '#q-app/wrappers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
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

  app.config.globalProperties.$loading = {
    show() {
      NProgress.start()
    },
    hide() {
      NProgress.done()
    },
  }
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$notify = ElNotification
})

function iconName(key) {
  let temp = key.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase()
  })
  return `el-icon${temp}`
}

import { boot } from 'quasar/wrappers'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
// 导入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-alert.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$notify = ElNotification
})

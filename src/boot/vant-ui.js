import { boot } from 'quasar/wrappers'
import { Toast, Notify } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/notify/style';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$toast = Toast
  app.config.globalProperties.$notify = Notify
})

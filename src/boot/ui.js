import { boot } from 'quasar/wrappers'
import { Notify, Loading } from 'quasar'
import NutUI, { showNotify } from "@nutui/nutui";

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(NutUI)
  app.config.globalProperties.$notify = function (val) {
    showNotify.text(val.message)
  }
  app.config.globalProperties.$loading = Loading
})

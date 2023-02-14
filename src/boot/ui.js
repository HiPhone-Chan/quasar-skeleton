import { boot } from 'quasar/wrappers'
import { Notify, Loading } from 'quasar'

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$loading = Loading
})

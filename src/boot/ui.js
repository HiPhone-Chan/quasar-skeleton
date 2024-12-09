import { boot } from 'quasar/wrappers'
import { Loading } from 'quasar'
import { showNotify } from '@nutui/nutui'

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$notify = function (val) {
    showNotify.text(val.message)
  }
  app.config.globalProperties.$loading = Loading
})

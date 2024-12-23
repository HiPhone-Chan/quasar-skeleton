import { defineBoot } from '#q-app/wrappers'
import { Loading } from 'quasar'
import { showNotify } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/notify/style'

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default defineBoot(async ({ app }) => {
  app.config.globalProperties.$notify = showNotify
  app.config.globalProperties.$loading = Loading
})

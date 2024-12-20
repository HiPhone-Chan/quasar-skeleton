import { defineBoot } from '#q-app/wrappers'
import { Notify, Loading } from 'quasar'

// for other ui library
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default defineBoot(async ({ app }) => {
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$loading = Loading
})

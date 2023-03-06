import { boot } from 'quasar/wrappers'
import 'virtual:svg-icons-register'
import SvgIcon from 'src/components/SvgIcon/index.vue'// svg component
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('svg-icon', SvgIcon);
})

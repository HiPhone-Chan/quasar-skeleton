import { defineBoot } from '#q-app/wrappers'
import { nextTick } from 'vue'
import { useLogStore } from '@/stores/log-store'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default defineBoot(async ({ app }) => {
  app.config.errorHandler = async function (err, vm) {
    await nextTick()
    useLogStore().error(vm.label, err.message)
  }
})

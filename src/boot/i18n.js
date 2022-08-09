import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAppStore } from '@/stores/app-store';

let i18nGlobal;

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: useAppStore().language,
    fallbackLocale: 'zh-CN',
    globalInjection: true,
    messages
  })
  i18nGlobal = i18n.global
  // Set i18n instance on app
  app.use(i18n)
})

export { i18nGlobal as i18n }

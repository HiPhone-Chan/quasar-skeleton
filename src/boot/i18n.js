import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAppStore } from '@/stores/app-store'
import { useI18nStore } from '@/stores/i18n-store'

export default defineBoot(({ app, store }) => {
  const appStore = process.env.SERVER ? useAppStore(store) : useAppStore()
  const i18nStore = process.env.SERVER ? useI18nStore(store) : useI18nStore()

  const i18n = createI18n({
    legacy: false,
    locale: appStore.language,
    globalInjection: true,
    messages,
  })
  // Set i18n instance on app
  app.use(i18n)
  i18nStore.$i18n = i18n
})

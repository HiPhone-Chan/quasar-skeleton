import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAppStore } from '@/stores/app-store'

export default defineBoot(({ app, store }) => {
  // Set i18n instance on app
  const appStore = process.env.SERVER ? useAppStore(store) : useAppStore()
  const _i18n = createI18n({
    locale: appStore.language,
    globalInjection: true,
    messages,
  })
  app.use(_i18n)
})

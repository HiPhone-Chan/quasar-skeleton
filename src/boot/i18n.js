import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAppStore } from '@/stores/app-store'

export default defineBoot(({ app, store }) => {
  const appStore = process.env.SERVER ? useAppStore(store) : useAppStore()
  const i18n = createI18n({
    locale: appStore.language,
    globalInjection: true,
    messages,
  })
  // Set i18n instance on app
  app.use(i18n)
})

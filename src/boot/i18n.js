import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useAppStore } from '@/stores/app-store'

const _i18n = createI18n({
  globalInjection: true,
  messages,
})

export default defineBoot(({ app, store }) => {
  const appStore = process.env.SERVER ? useAppStore(store) : useAppStore()
  _i18n.locale = appStore.language
  // Set i18n instance on app
  app.use(_i18n)
})

export const i18n = _i18n.global

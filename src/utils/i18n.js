import { i18n } from 'boot/i18n'

// translate router.meta.title
// use for router nav title / page title
export function generateTitle(title) {
  const hasKey = i18n.te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n
    const translatedTitle = i18n.t('route.' + title)
    return translatedTitle
  }
  return title
}

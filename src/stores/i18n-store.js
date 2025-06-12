import { defineStore, acceptHMRUpdate } from 'pinia'
import { toRaw } from 'vue'

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    $i18n: null,
  }),
  actions: {
    generateTitle(title) {
      const i18n = toRaw(this.$i18n).global
      const hasKey = i18n.te('route.' + title)

      if (hasKey) {
        // $t :this method from vue-i18n
        const translatedTitle = i18n.t('route.' + title)
        return translatedTitle
      }
      return title
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useI18nStore, import.meta.hot))
}

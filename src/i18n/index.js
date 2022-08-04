import enUS from './en-US'
import zhCN from './zh-CN'
import elementEnLocale from 'element-plus/es/locale/lang/en'
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'

const messages = {
  'en-US': {
    ...enUS,
    ...elementEnLocale
  },
  'zh-CN': {
    ...zhCN,
    ...elementZhLocale
  }
}

export function getLanguage() {
  const language = (navigator.language || navigator.browserLanguage)
  // .toLowerCase()

  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh-CN'
}

export default messages;

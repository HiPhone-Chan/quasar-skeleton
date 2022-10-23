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

export function getLocalLanguage() {
  if (process.env.CLIENT) {
    if (navigator) {
      return (navigator.language || navigator.browserLanguage);
    }
  }
  return 'zh-CN'
}

export function getLanguage() {
  const language = getLocalLanguage()

  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return language
}

export default messages;

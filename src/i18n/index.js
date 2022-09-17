import enUS from './en-US'
import zhCN from './zh-CN'

const messages = {
  'en-US': {
    ...enUS
  },
  'zh-CN': {
    ...zhCN
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
  return 'zh-CN'
}

export default messages;

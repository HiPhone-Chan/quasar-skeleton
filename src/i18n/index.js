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
  return 'zh'
}

export function getLanguage() {
  const language = getLocalLanguage()

  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (locale.indexOf(language) > -1) {
      return locale
    }
  }
  return language
}

export default messages;

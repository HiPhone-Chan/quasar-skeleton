import { Locale } from '@nutui/nutui';
import enUS from './en-US';
import zhCN from './zh-CN';
import nutuiEnUS from '@nutui/nutui/dist/packages/locale/lang/en-US';

const messages = {
  'en-US': {
    ...enUS
  },
  'zh-CN': {
    ...zhCN
  }
};

Locale.use('en-US', nutuiEnUS);
Locale.merge('zh-CN', messages['zh-CN']);
Locale.merge('en-US', messages['en-US']);

export function getLocalLanguage() {
  if (process.env.CLIENT) {
    if (navigator) {
      return navigator.language || navigator.browserLanguage;
    }
  }
<<<<<<< HEAD
  return 'zh-CN';
=======
  return 'zh'
>>>>>>> master
}

export function getLanguage() {
  const language = getLocalLanguage();

  const locales = Object.keys(messages);
  for (const locale of locales) {
<<<<<<< HEAD
    if (language.indexOf(locale) > -1) {
      return locale;
=======
    if (locale.indexOf(language) > -1) {
      return locale
>>>>>>> master
    }
  }
  return language;
}

export default messages;

export { getStorage } from 'boot/storage'

export function getLocalLanguage() {
  if (process.env.CLIENT) {
    if (navigator) {
      return (navigator.language || navigator.browserLanguage);
    }
  }

  return 'zh-CN'
}


export function setTitle(title) {
  if (process.env.CLIENT) {
    document.title = title
  }
}

import { getFileName } from '@/utils/url'
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'

const localeModules = import.meta.glob('./**.json', { eager: true })

const data = {}

Object.keys(localeModules).forEach((key) => {
  data[getFileName(key)] = localeModules[key].default
})

console.log(12, elementZhLocale)
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default data

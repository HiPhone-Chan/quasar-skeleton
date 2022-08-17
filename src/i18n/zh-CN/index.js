import { getFileName } from '@/utils/url'
const localeModules = import.meta.globEager('./**.json')
const data = {}

Object.keys(localeModules).forEach(key => {
  data[getFileName(key)] = localeModules[key].default
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default data

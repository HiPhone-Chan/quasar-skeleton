import defaultSettings from '@/settings'
import { generateTitle } from '@/utils/i18n';

const title = defaultSettings.title || 'Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${generateTitle(pageTitle)} - ${title}`
  }
  return `${title}`
}

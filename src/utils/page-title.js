import { useTitle } from '@vueuse/core';
import defaultSettings from '@/settings';
import { generateTitle } from '@/utils/i18n';

const title = defaultSettings.title || 'Admin';

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${generateTitle(pageTitle)} - ${title}`;
  }
  return `${title}`;
}

export function setTitle(title) {
  if (process.env.CLIENT) {
    useTitle(title);
  }
}

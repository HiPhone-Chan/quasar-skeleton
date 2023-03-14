import Layout from '@/layouts/MainLayout.vue'

export default {
  path: '/external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/HiPhone-Chan/quasar-skeleton',
      meta: { title: 'External Link', icon: 'link' }
    }
  ]
}

export const priority = 999;

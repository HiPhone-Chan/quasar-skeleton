import Layout from '@/layouts/MainLayout.vue'

export default {
  path: '/management',
  component: Layout,
  // redirect: 'noredirect',
  meta: {
    title: 'management',
    icon: 'user',
    roles: ['ROLE_ADMIN']
  },
  children: [
    {
      path: 'user',
      component: () => import('pages/management/user/index.vue'),
      name: 'user',
      meta: {
        title: 'user-management',
        icon: 'people',
        noCache: true
      }
    }
  ]
}

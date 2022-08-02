import Layout from '@/layouts/MainLayout.vue'

const managementRouter = {
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

export default managementRouter

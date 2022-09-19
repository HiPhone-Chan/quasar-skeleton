import Layout from '@/layouts/MainLayout.vue'

export default [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('pages/redirect/index.vue')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('pages/login/auth-redirect.vue'),
    hidden: true
  }
]

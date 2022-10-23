import Layout from '@/layouts/MainLayout.vue'

export default [
  {
    path: '/login',
    component: () => import('pages/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('pages/home/index.vue'),
        name: 'home',
        meta: { title: 'home', icon: 'home', roles: [] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('pages/profile/index.vue'),
        name: 'profile',
        meta: { title: 'profile', icon: 'user', roles: [], noCache: true }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    hidden: true,
    component: () => import('pages/error-page/404.vue')
  }
]

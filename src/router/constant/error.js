export default [
  {
    path: '/404',
    component: () => import('pages/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('pages/error-page/401.vue'),
    hidden: true
  }
]

import Layout from 'pages/home/plugins/Layout.vue'

export default {
  path: '/plugins',
  component: Layout,
  hidden: true,
  meta: { roles: false },
  children: [
    {
      path: 'file-system',
      component: () => import('pages/home/plugins/file-system/index.vue'),
      name: 'file-system',
      meta: { title: 'file-system', roles: false, noCache: true },
    },
    {
      path: 'serial-port',
      component: () => import('pages/home/plugins/serial-port/index.vue'),
      name: 'serial-port',
      meta: { title: 'serial port', roles: false, noCache: true },
    },
    {
      path: 'app',
      component: () => import('pages/home/plugins/app/index.vue'),
      name: 'app',
      meta: { title: 'app', roles: false, noCache: true },
    },
  ],
}

export const priority = 999

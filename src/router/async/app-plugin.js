import Layout from 'pages/home/plugins/Layout.vue'

export default {
  path: '/plugins',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'file-system',
      component: () => import('pages/home/plugins/file-system/index.vue'),
      name: 'file-system',
      meta: { title: 'file-system', noCache: true },
    },
    {
      path: 'serial-port',
      component: () => import('pages/home/plugins/serial-port/index.vue'),
      name: 'serial-port',
      meta: { title: 'serial port', noCache: true },
    },
  ],
}

export const priority = 999

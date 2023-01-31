import Layout from '@/layouts/MainLayout.vue'
import { h } from 'vue';
import { Link } from '@nutui/icons-vue'

export default {
  path: '/external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/HiPhone-Chan/quasar-skeleton',
      meta: { title: 'External Link', icon: h(Link) }
    }
  ]
}

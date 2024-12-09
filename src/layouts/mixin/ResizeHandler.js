import { useAppStore } from '@/stores/app-store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        useAppStore().closeSideBar({ withoutAnimation: false })
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      useAppStore().toggleDevice('mobile')
      useAppStore().closeSideBar({ withoutAnimation: false })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        useAppStore().toggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          useAppStore().closeSideBar({ withoutAnimation: false })
        }
      }
    },
  },
}

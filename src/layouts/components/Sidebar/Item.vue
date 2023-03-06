<script>
import { h } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(i) {
    const vnodes = []

    if (this.icon) {
      vnodes.push(h(SvgIcon, { 'icon-class': this.icon }))
    }

    if (this.title) {
      vnodes.push(h('span', {}, [this.title]))
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

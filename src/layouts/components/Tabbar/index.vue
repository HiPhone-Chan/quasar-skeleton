<template>
  <nut-tabbar v-model:visible="activeIndex" @tab-switch="tabSwitch"
    :bottom="true" :safeAreaInsetBottom="true">
    <tabbar-item ref="tabbarItems" v-for="route in permission_routes"
      :key="route.path" :item="route" :base-path="route.path">
    </tabbar-item>
  </nut-tabbar>
</template>

<script>
import { mapState } from 'pinia'
import { usePermissionStore } from '@/stores/permission-store'
import TabbarItem from './TabbarItem.vue'

// TODO 等待nutui支持name 的bug
export default {
  name: "TabbarIndex",
  components: { TabbarItem },
  data() {
    return {
      activeIndex: 0
    }
  },
  mounted() {
    const storeIndex = localStorage.getItem('activeIndex')
    if (storeIndex) {
      this.activeIndex = Number(storeIndex)
    }
  },
  computed: {
    ...mapState(usePermissionStore, { permission_routes: 'routes' })
  },
  methods: {
    tabSwitch(item, index) {
      this.activeIndex = index
      localStorage.setItem('activeIndex', index)
    }
  }
};
</script>

<style>
</style>

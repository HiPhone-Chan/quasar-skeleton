<template>
  <nut-tabbar v-model:visible="$route.name" :bottom="true"
    :safeAreaInsetBottom="true">
    <tabbar-item ref="tabbarItems" v-for="route in permission_routes"
      :key="route.path" :item="route" :base-path="route.path">
    </tabbar-item>
  </nut-tabbar>
</template>

<script>
import { mapState } from 'pinia'
import { usePermissionStore } from '@/stores/permission-store'
import TabbarItem from './TabbarItem.vue'

export default {
  name: "TabbarIndex",
  components: { TabbarItem },
  computed: {
    ...mapState(usePermissionStore, { permission_routes: 'routes' })
  }
};
</script>

<style>

</style>

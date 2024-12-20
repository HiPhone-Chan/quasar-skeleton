<template>
  <q-tabs v-model="current" class="text-teal">
    <tabbar-item v-for="route in permission_routes" :key="route.path" :item="route"
      :base-path="route.path"></tabbar-item>
  </q-tabs>
</template>

<script>
import { mapState } from 'pinia'
import { usePermissionStore } from '@/stores/permission-store'
import TabbarItem from './TabbarItem.vue'

export default {
  name: "TabbarIndex",
  components: { TabbarItem },
  data() {
    return {
      current: '/'
    }
  },
  mounted() {
    this.current = this.$route.fullPath
  },
  computed: {
    ...mapState(usePermissionStore, { permission_routes: 'routes' }),
  }

}
</script>

<style></style>

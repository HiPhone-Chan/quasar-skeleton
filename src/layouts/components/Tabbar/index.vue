<template>
  <van-tabbar route>
    <tabbar-item v-for="route in permission_routes" :key="route.path"
      :item="route" :base-path="route.path"></tabbar-item>

  </van-tabbar>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'pinia'
import { usePermissionStore } from '@/stores/permission-store'
import TabbarItem from './TabbarItem.vue'

export default {
  name: "TabbarIndex",
  components: { TabbarItem },
  computed: {
    ...mapState(usePermissionStore, { permission_routes: 'routes' }),
  }
};
</script>

<style>
</style>

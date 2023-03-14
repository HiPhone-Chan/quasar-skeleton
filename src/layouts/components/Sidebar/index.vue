<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse"
        :background-color="variables.menuBg" :text-color="variables.menuText"
        :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path"
          :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/css/variables.module.scss'
import { useAppStore } from '@/stores/app-store'
import { usePermissionStore } from '@/stores/permission-store'
import { useSettingsStore } from '@/stores/settings-store'

export default {
  name: "SidebarIndex",
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(useAppStore, ['sidebar']),
    ...mapState(usePermissionStore, { permission_routes: 'routes' }),
    ...mapState(useSettingsStore, ['sidebarLogo']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

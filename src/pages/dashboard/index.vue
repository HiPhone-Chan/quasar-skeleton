<template>
  <div class="dashboard-container">
    <github-corner v-if="isAdmin"
      style="position: absolute; top: 0px; border: 0; right: 0;" />
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import GithubCorner from '@/components/GithubCorner/index.vue'
import adminDashboard from './admin/index.vue'
import otherDashboard from './other/index.vue'
import { useUserStore } from '@/stores/user-store'

export default {
  name: 'DashboardIndex',
  components: {
    GithubCorner, adminDashboard, otherDashboard
  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapState(useUserStore, ['roles']),
    isAdmin() {
      return this.roles.includes('ROLE_ADMIN')
    }
  },
  created() {
    if (this.roles.includes('ROLE_ADMIN')) {
      this.currentRole = 'adminDashboard'
    } else {
      this.currentRole = 'otherDashboard'
    }
  }
}
</script>

<template>
  <div>
    <q-btn color="red" @click="logout">退出</q-btn>
  </div>
</template>

<script>
import { logout } from '@/utils/auth';

export default {
  name: 'ProfileIndex',
  methods: {
    async logout() {
      await logout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style></style>

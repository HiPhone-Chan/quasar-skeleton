<template>
  <div>
    <q-btn color="red" @click="logout">退出</q-btn>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user-store';
import { useEventStore } from '@/stores/event-store'

export default {
  name: 'ProfileIndex',
  methods: {
    async logout() {
      await useUserStore().logout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style></style>

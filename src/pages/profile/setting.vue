<template>
  <div class="page-container">
    <navigate-back />

    <q-separator class="q-mt-sm" />

    <q-btn-group spread>
      <q-btn color="red" @click="logout">退出</q-btn>
    </q-btn-group>
  </div>
</template>

<script>
import NavigateBack from '@/components/NavigateBack/index.vue';
import { logout } from '@/utils/auth';

export default {
  name: 'ProfileIndex',
  components: { NavigateBack },
  methods: {
    async logout() {
      await logout();
      this.$router.replace(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style></style>

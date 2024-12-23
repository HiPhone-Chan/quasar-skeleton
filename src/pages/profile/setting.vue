<template>
  <div class="page-container">
    <navigate-back />

    <q-separator class="q-mt-sm" />

    <van-button block type="danger" @click="logout">
      退出
    </van-button>
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

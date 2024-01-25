<template>
  <div>
    <van-row align="center">
      <van-col span="8">
        <van-image round class="avatar" :src="avatar" />
      </van-col>
      <van-col span="16" class="desc">
        <div>{{ mobile }}</div>
      </van-col>
    </van-row>

    <van-divider />

    <van-cell-group>
      <van-cell title="设置" is-link to="/setting" />
    </van-cell-group>
    <van-divider />

    <van-button round block type="danger" @click="logout">
      退出
    </van-button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user-store'
import { mapState } from 'pinia'
import { logout } from '@/utils/auth';

export default {
  name: "ProfileIndex",
  computed: {
    ...mapState(useUserStore, ['mobile', 'avatar'])
  },
  methods: {
    async logout() {
      await logout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style lang="scss" scoped>
$avatarSize: 4em;

.avatar {
  width: $avatarSize;
  height: $avatarSize;
  margin: 2em 0 0 2em;
}
</style>

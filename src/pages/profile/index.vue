<template>
  <div>
    <nut-row align="center">
      <nut-col :span="8">
        <nut-image round class="avatar" :src="avatar" />
      </nut-col>
      <nut-col :span="16" class="desc">
        <div>{{ mobile }}</div>
      </nut-col>
    </nut-row>

    <nut-divider />

    <nut-cell-group>
      <nut-cell title="设置" is-link to="/setting" />
    </nut-cell-group>
    <nut-divider />

    <nut-button round block type="danger" @click="logout">
      退出
    </nut-button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user-store'
import { useEventStore } from '@/stores/event-store'
import { mapState } from 'pinia'

export default {
  name: "ProfileIndex",
  computed: {
    ...mapState(useUserStore, ['mobile', 'avatar'])
  },
  methods: {
    async logout() {
      await useUserStore().logout();
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

.desc {
  padding: 2em 0 0 2em;
}
</style>

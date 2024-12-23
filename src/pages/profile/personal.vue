<template>
  <van-row align="center">
    <van-col span="8">
      <van-image round class="avatar" :src="avatar" />
    </van-col>
    <van-col span="16" class="desc">
      <div>{{ mobile }}</div>
    </van-col>
  </van-row>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user-store'

export default {
  name: "PersonalData",
  computed: {
    ...mapState(useUserStore, ['mobile', 'avatar'])
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

<template>
  <q-card class="my-card">
    <q-item class="q-pt-none">
      <q-item-section avatar class="avatar">
        <q-avatar>
          <img :src="avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ mobile }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>

</template>

<script>
import defaultAvatar from '@/assets/avatar.gif'

export default {
  name: "PersonalData",
  data() {
    return {
      avatar: defaultAvatar,
      mobile: '13x********'
    }
  }
}
</script>

<style lang="scss" scoped>
$card-height: 100px;

.my-card {
  width: 100%;
  height: $card-height;
}

.avatar {
  height: $card-height;
}
</style>

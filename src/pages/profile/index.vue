<template>
  <div>
    <personal />

    <van-divider />

    <van-cell-group>
      <van-cell title="设置" is-link to="/profile/setting" />
    </van-cell-group>
    <van-divider />
  </div>
</template>

<script>
import Personal from './personal.vue';

export default {
  name: 'ProfileIndex',
  components: { Personal }
}
</script>

<style lang="scss" scoped></style>

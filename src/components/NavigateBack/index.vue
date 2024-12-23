<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="navigateBack" />
</template>

<script>
export default {
  name: "NavigateBack",
  props: {
    title: {
      type: String,
      default: "返回"
    }
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style></style>

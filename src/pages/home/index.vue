<template>
  <div>home</div>
</template>

<script>
export default {
  name: 'HomeIndex',
  mounted() {
    this.$router.replace({ path: '/dashboard' })
  },
}
</script>

<style></style>

<template>
  <div>
    <navigate-back />
    <router-view />
  </div>
</template>

<script>
import NavigateBack from '@/components/NavigateBack/index.vue';

export default {
  name: 'ProfileIndex',
  components: { NavigateBack }
}
</script>

<style></style>

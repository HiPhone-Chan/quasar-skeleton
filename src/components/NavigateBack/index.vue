<template>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar @click="navigateBack()">
        <q-icon name="navigate_before" />
      </q-item-section>
      <q-item-section class="text-center">{{ title }}</q-item-section>
    </q-item>
  </q-list>

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

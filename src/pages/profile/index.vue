<template>
  <div>
    <personal />

    <q-separator class="q-mt-sm" />

    <q-list bordered>
      <q-item clickable v-ripple @click="navigateTo('/profile/setting')">
        <q-item-section>设置</q-item-section>
        <q-item-section avatar>
          <q-icon name="navigate_next" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Personal from './personal.vue';

export default {
  name: 'ProfileIndex',
  components: { Personal },
  methods: {
    navigateTo(page) {
      this.$router.push({ path: page })
    }
  }
}
</script>

<style></style>

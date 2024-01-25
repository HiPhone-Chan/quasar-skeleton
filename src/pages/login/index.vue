<template>
  <div class="column" style="height: 200px">
    <div class="col">
    </div>
    <div class="col self-center">
      <q-btn color="primary" :label="$t('login.logIn')" @click="handleLogin" />
    </div>
    <div class="col">
    </div>
  </div>
</template>

<script>
import { login } from '@/utils/auth'

export default {
  name: 'LoginIndex',
  methods: {
    handleLogin() {
      login({}).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      })
    }
  }
}
</script>

<style></style>

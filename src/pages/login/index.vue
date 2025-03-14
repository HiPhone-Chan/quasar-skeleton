<template>
  <div class="page-container login-container column">
    <div class="col"></div>
    <div class="col">
      <q-form class="login-form" ref="loginForm">
        <q-input v-model="username" placeholder="用户名" bg-color="white" outlined dense lazy-rules
          :rules="[val => val && val.length > 0 || '请输入用户名']">
          <template #prepend>
            <span class="label">用户名</span>
          </template>
        </q-input>
        <q-input v-model="password" placeholder="密码" bg-color="white" outlined dense lazy-rules :rules="[
          val => val !== null && val !== '' || '请输入密码',
        ]">
          <template #prepend>
            <span class="label">密 码</span>
          </template>
        </q-input>

        <q-btn-group spread>
          <q-btn color="primary" :label="$t('login.logIn')" @click="handleLogin" />
        </q-btn-group>
      </q-form>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '@/utils/auth'

export default {
  name: 'LoginIndex',
  setup() {
    const username = ref('');
    const password = ref('');

    return {
      username,
      password
    };
  },
  methods: {
    async handleLogin() {
      console.log(this.$refs)
      this.$refs["loginForm"].validate().then(async (success) => {
      if (success) {
        await login({});
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      }
      else {
        // oh no, user has filled in at least one invalid value
      }
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  background-color: #fbf9f9;

  .login-form {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .label {
    min-width: 4rem;
    font-size: 1rem;
    color: black;
  }
}
</style>

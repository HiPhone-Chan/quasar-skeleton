<template>
  <van-col class="page-container login-container column">
    <van-row class="col-4"></van-row>
    <van-row class="col" justify="center">
      <van-form class="login-form" ref="loginForm">
        <van-cell-group inset>
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="密码" label="密码" autocomplete placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button block type="primary" @click="handleLogin">
            {{ $t('login.logIn') }}
          </van-button>
        </div>
      </van-form>
    </van-row>
  </van-col>
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
      try {
        await this.$refs["loginForm"].validate()
        await login({});
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      } catch (err) {
        console.log(err)
      }
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
}
</style>

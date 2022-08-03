<template>
  <van-col class="login-container column">
    <van-row class="col-4"></van-row>
    <van-row class="col" justify="center">
      <van-form class="login-form">
        <van-cell-group inset>
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="密码" label="密码"
            placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" @click="handleLogin">
            提交
          </van-button>
        </div>
      </van-form>
    </van-row>

  </van-col>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store'

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
    handleLogin() {
      useUserStore().login({}).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  height: 100%;
  width: 100%;
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

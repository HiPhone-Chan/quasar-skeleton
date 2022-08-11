<template>
  <div class="column" style="height: 200px">
    <div class="col">
    </div>
    <div class="col self-center">
      <q-btn color="primary" label="login" @click="handleLogin" />
    </div>
    <div class="col">
    </div>
  </div>
  <!-- <nut-row class="login-container">
    <nut-col class="space"></nut-col>
    <nut-col>
      <nut-form class="login-form">
        <nut-form-item prop="username" label="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]">
          <input class="nut-input-text" @blur="customBlurValidate('name')"
            v-model="username" placeholder="请输入姓名" type="text" />
        </nut-form-item>
        <nut-form-item prop="password" label="密码"
          :rules="[{ required: true, message: '请填写密码' }]">
          <input class="nut-input-text" @blur="customBlurValidate('password')"
            v-model="password" placeholder="请输入姓名" type="password" />
        </nut-form-item>

        <nut-cell>
          <nut-button block type="info" @click="handleLogin">
            提交
          </nut-button>
        </nut-cell>
      </nut-form>
    </nut-col>
  </nut-row> -->
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
    },
    customBlurValidate(prop) {
      ruleForm.value.validate(prop).then(({ valid, errors }) => {
        if (valid) {
          console.log('success', formData);
        } else {
          console.log('error submit!!', errors);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  overflow: hidden;
  background-color: #fbf9f9;

  .space {
    height: 30%;
  }
}
</style>

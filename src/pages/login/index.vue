<template>
  <nut-row class="login-container">
    <nut-col class="space"></nut-col>
    <nut-col>
      <nut-form class="login-form" :model-value="formData" ref="ruleForm">
        <nut-form-item prop="username" label="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]">
          <input class="nut-input-text" @blur="customBlurValidate('username')"
            v-model="formData.username" placeholder="请输入姓名" type="text"
            autocomplete="username" />
        </nut-form-item>
        <nut-form-item prop="password" label="密码"
          :rules="[{ required: true, message: '请填写密码' }]">
          <input class="nut-input-text" @blur="customBlurValidate('password')"
            v-model="formData.password" placeholder="请输入姓名" type="password"
            autocomplete="password" />
        </nut-form-item>

        <nut-cell>
          <nut-button block type="info" @click="handleLogin">
            {{ $t('login.logIn') }}
          </nut-button>
        </nut-cell>
      </nut-form>
    </nut-col>
  </nut-row>
</template>

<script>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user-store'

export default {
  name: 'LoginIndex',
  setup() {
    const formData = reactive({
      username: '',
      password: ''
    });

    const validate = (item) => {
      console.log(item);
    };

    const ruleForm = ref(validate);

    return {
      formData, ruleForm
    };
  },
  methods: {
    handleLogin() {
      useUserStore().login(this.formData).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      })
    },
    customBlurValidate(prop) {
      this.ruleForm.validate(prop).then(({ valid, errors }) => {
        if (!valid) {
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

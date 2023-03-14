<template>
  <div class="form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="form.oldPwd" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd">
        <el-input v-model="form.confirmPwd" type="password" auto-complete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('form')">保存</el-button>
        <el-button @click="reset('form')">清空</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { changePassword } from '@/api/account'
import { LOGIN_VALID_CHARACTER } from '@/utils/user'

export default {
  data() {
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码' }],
        newPwd: [LOGIN_VALID_CHARACTER, { required: true, message: '请输入新密码' }],
        confirmPwd: [
          { required: true, message: '请确认信密码' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入确认密码'))
              } else if (value !== this.form.newPwd) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const req = {
            currentPassword: this.form.oldPwd,
            newPassword: this.form.newPwd
          }
          await changePassword(req)
          this.$notify({
            title: '修改成功',
            type: 'success'
          })
          this.reset(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 10px;
  width: 300px;
}
</style>

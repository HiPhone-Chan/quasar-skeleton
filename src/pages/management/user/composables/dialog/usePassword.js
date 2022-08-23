import { getCurrentInstance, nextTick } from 'vue';
import { changePassword } from '@/api/user'

export default function (temp, dialog) {
  const instance = getCurrentInstance();
  const app = instance.appContext.config.globalProperties;

  const handlePassword = (row) => {
    dialog.status = 'password'
    dialog.visible = true
    temp.value = {
      login: row.login,
      currentPassword: '',
      newPassword: ''
    }

    nextTick(() => {
      instance.refs['dataForm'].clearValidate()
    })
  }

  const changePwd = () => {
    instance.refs['dataForm'].validate(async valid => {
      if (valid) {
        const val = temp.value
        const changePwdVM = {
          currentPassword: val.currentPassword,
          newPassword: val.newPassword
        }

        try {
          await changePassword(val.login, changePwdVM)
          app.$notify({
            title: '修改成功',
            type: 'success'
          })
        } catch (err) {
          app.$notify({
            title: '修改失败',
            type: 'warning'
          })
        }
        dialog.visible = false
      }
    })
  }

  return { handlePassword, changePwd }
}

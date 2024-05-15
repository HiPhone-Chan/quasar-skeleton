import { getCurrentInstance, nextTick } from 'vue';
import { changePassword } from '@/api/user';

export default function (temp, dialog, formName) {
  const instance = getCurrentInstance();
  const app = instance.appContext.config.globalProperties;
  const STATUS_PASSWORD = 'password';

  const handlePassword = (row) => {
    dialog.status = STATUS_PASSWORD;
    dialog.visible = true;
    temp.value = {
      login: row.login,
      currentPassword: '',
      newPassword: ''
    };

    nextTick(() => {
      instance.refs[formName].clearValidate();
    });
  };

  const changePwd = async () => {
    try {
      if (!await instance.refs[formName].validate()) {
        return;
      }

      const val = temp.value;
      const changePwdVM = {
        currentPassword: val.currentPassword,
        newPassword: val.newPassword
      };
      await changePassword(val.login, changePwdVM);
      app.$notify({
        type: 'success',
        title: '修改成功'
      });
      dialog.visible = false;
    } catch (error) {
      console.log('changePwd failed', error)
      const errType = Object.prototype.toString.call(error)
      switch (errType) {
        case '[object Object]': break; // 校验失败
        default:
          app.$notify({
            type: 'warning',
            title: '修改失败'
          });
      }
    }
  };

  return { handlePassword, changePwd, STATUS_PASSWORD };
}

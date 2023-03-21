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

  const changePwd = () => {
    instance.refs[formName].validate(async (valid) => {
      if (valid) {
        const val = temp.value;
        const changePwdVM = {
          currentPassword: val.currentPassword,
          newPassword: val.newPassword
        };

        try {
          await changePassword(val.login, changePwdVM);
          app.$notify({
            title: '修改成功',
            type: 'success'
          });
        } catch (err) {
          app.$notify({
            title: '修改失败',
            type: 'warning'
          });
        }
        dialog.visible = false;
      }
    });
  };

  return { handlePassword, changePwd, STATUS_PASSWORD };
}

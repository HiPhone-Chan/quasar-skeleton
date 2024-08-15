import { getCurrentInstance } from 'vue';
import { changePassword } from '@/api/user';

export const STATUS_PASSWORD = 'password';
export default function (openDialog, closeDialog, dialogForm, formName) {
  const instance = getCurrentInstance();
  const app = instance.appContext.config.globalProperties;

  const handlePassword = (row) => {
    dialogForm.value = {
      login: row.login,
      currentPassword: '',
      newPassword: ''
    };
    openDialog(STATUS_PASSWORD, formName);
  };

  const changePwd = async () => {
    try {
      const val = dialogForm.value;
      const changePwdVM = {
        currentPassword: val.currentPassword,
        newPassword: val.newPassword
      };

      await closeDialog(async () => {
        await changePassword(val.login, changePwdVM);
      }, formName);

      app.$notify({
        type: 'success',
        title: '修改成功'
      });
    } catch (error) {
      console.log('changePwd failed', error);
      const errType = Object.prototype.toString.call(error);
      switch (errType) {
        case '[object Object]':
          break; // 校验失败
        default:
          app.$notify({
            type: 'warning',
            title: '修改失败'
          });
      }
    }
  };

  return { handlePassword, changePwd };
}

import { getCurrentInstance } from 'vue';
import { changePassword } from '@/api/user';

export const STATUS_PASSWORD = 'password';
export default function (openDialog, confirmDialog, dialogForm, formName) {
  const instance = getCurrentInstance();
  const app = instance.appContext.config.globalProperties;

  const passwordRules = {
    currentPassword: [{ required: true, message: 'Current password is required' }],
    newPassword: [{ required: true, message: 'New password is required' }]
  };

  const handlePassword = (row) => {
    dialogForm.value = {
      login: row.login,
      currentPassword: '',
      newPassword: ''
    };
    openDialog(formName, STATUS_PASSWORD);
  };

  const changePwd = async () => {
    const val = dialogForm.value;
    const changePwdVM = {
      currentPassword: val.currentPassword,
      newPassword: val.newPassword
    };

    await confirmDialog(formName, async () => {
      await changePassword(val.login, changePwdVM);
    });

    app.$notify({
      type: 'success',
      title: '修改成功'
    });
  };

  return { handlePassword, changePwd, passwordRules };
}

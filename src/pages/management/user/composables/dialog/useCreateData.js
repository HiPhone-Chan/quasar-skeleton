import { createRoleOptions } from '@/utils/user';
import { checkUserLogin, createUser } from '@/api/user';
import { LOGIN_VALID_CHARACTER } from '@/utils/user';

export const STATUS_CREATE = 'create';
export default function (openDialog, confirmDialog, dialog, dialogForm, getData, formName) {
  const validateLogin = async (rule, value, callback) => {
    if (dialog.status === STATUS_CREATE) {
      if (value) {
        if (LOGIN_VALID_CHARACTER.pattern.test(value)) {
          const resp = await checkUserLogin(value);
          const data = resp.data;
          if (data) {
            callback(new Error('Login exists'));
          }
        } else {
          callback(new Error(LOGIN_VALID_CHARACTER.message));
        }
      } else {
        callback(new Error('Please enter login'));
      }
    }
  };

  const createRules = {
    login: [{ required: true, trigger: 'blur', validator: validateLogin }],
    authorities: [
      {
        required: true,
        message: '请选择权限'
      }
    ],
    mobile: [{ pattern: /^[0-9]{7,16}$/, message: '请输入正确的电话号码' }]
  };

  const handleCreate = () => {
    dialogForm.value = {
      login: '',
      nickName: '',
      mobile: '',
      authorities: [createRoleOptions[0].value]
    };
    openDialog(formName, STATUS_CREATE);
  };

  const createData = async () => {
    await confirmDialog(formName, async () => {
      await createUser(dialogForm.value);
    });
    getData();
  };

  return { handleCreate, createData, createRules };
}

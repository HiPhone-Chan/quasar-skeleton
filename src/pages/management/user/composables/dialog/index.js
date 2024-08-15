import { ref, reactive, getCurrentInstance, nextTick } from 'vue';
import { LOGIN_VALID_CHARACTER } from '@/utils/user';
import { checkUserLogin } from '@/api/user';

export default function () {
  const validateLogin = async (rule, value, callback) => {
    if (dialog.status === 'create') {
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

  const rules = reactive({
    login: [{ required: true, trigger: 'blur', validator: validateLogin }],
    authorities: [
      {
        required: true,
        message: '请选择权限'
      }
    ],
    mobile: [{ pattern: /^[0-9]{7,16}$/, message: '请输入正确的电话号码' }],
    currentPassword: [{ required: true, message: 'Current password is required' }],
    newPassword: [{ required: true, message: 'New password is required' }]
  });

  const dialogForm = ref({});

  const dialog = reactive({
    visible: false,
    status: ''
  });

  const instance = getCurrentInstance();

  const openDialog = (status, refName) => {
    dialog.status = status;
    dialog.visible = true;

    nextTick(() => {
      instance.refs[refName].clearValidate();
    });
  };

  const closeDialog = async (invokeFunc, refName) => {
    if (!(await instance.refs[refName].validate())) {
      return;
    }
    await invokeFunc();
    dialog.visible = false;
  };

  return {
    dialog,
    dialogForm,
    openDialog,
    closeDialog,
    rules
  };
}

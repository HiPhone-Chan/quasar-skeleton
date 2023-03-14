import { getCurrentInstance, ref, reactive } from 'vue';
import { LOGIN_VALID_CHARACTER } from '@/utils/user'
import { checkUserLogin } from '@/api/user'

export default function () {
  const instance = getCurrentInstance();

  const validateLogin = async (rule, value, callback) => {
    if (dialog.status === 'create') {
      if (value) {
        if (LOGIN_VALID_CHARACTER.pattern.test(value)) {
          const resp = await checkUserLogin(value)
          const data = resp.data
          if (data) {
            callback(new Error('Login exists'))
          }
        } else {
          callback(new Error(LOGIN_VALID_CHARACTER.message))
        }
      } else {
        callback(new Error('Please enter login'))
      }
    }
  }

  const rules = reactive({
    login: [{ required: true, trigger: 'blur', validator: validateLogin }],
    authorities: [
      {
        required: true,
        message: '请选择权限'
      }
    ],
    mobile: [{ pattern: /^[0-9]{7,16}$/, message: '请输入正确的电话号码' }],
    currentPassword: [
      { required: true, message: 'Current password is required' }
    ],
    newPassword: [
      { required: true, message: 'New password is required' }
    ]
  })

  let temp = ref({})

  const dialog = reactive({
    visible: false,
    status: ''
  })

  return {
    temp, dialog, rules
  }
}

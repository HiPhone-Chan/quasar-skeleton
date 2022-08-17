import { getCurrentInstance, ref, reactive, nextTick } from 'vue';
import { checkUserLogin } from '@/api/user'
import { roleOptions } from '@/utils/app-option'
import { LOGIN_VALID_CHARACTER } from '@/utils/validate'

export default function () {

  const instance = getCurrentInstance();
  const app = instance.appContext.config.globalProperties;

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

  let temp = ref({
    login: "",
    nickName: "",
    mobile: "",
    authorities: [roleOptions[1].value]
  })

  const dialog = reactive({
    visible: false,
    status: ''
  })

  const handleCreate = () => {
    dialog.status = 'create'
    dialog.visible = true
    temp.value = {
      login: "",
      nickName: "",
      mobile: "",
      authorities: [roleOptions[1].value]
    }

    nextTick(() => {
      instance.refs['dataForm'].clearValidate()
    })
  }

  const handleUpdate = (row) => {
    dialog.status = 'update'
    dialog.visible = true
    temp.value = Object.assign({}, row)

    nextTick(() => {
      instance.refs['dataForm'].clearValidate()
    })
  }

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

  return {
    temp, dialog, rules,
    handleCreate, handleUpdate, handlePassword
  }
}

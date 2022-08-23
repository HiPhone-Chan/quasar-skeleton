import { getCurrentInstance, nextTick } from 'vue';
import { createRoleOptions } from '@/utils/app-option'
import { createUser } from '@/api/user'

export default function (temp, dialog, getData) {
  const instance = getCurrentInstance();

  const handleCreate = () => {
    console.log(instance)
    dialog.status = 'create'
    dialog.visible = true
    temp.value = {
      login: "",
      nickName: "",
      mobile: "",
      authorities: [createRoleOptions[0].value]
    }

    nextTick(() => {
      instance.refs['dataForm'].clearValidate()
    })
  }

  const createData = () => {
    instance.refs['dataForm'].validate(async valid => {
      if (valid) {
        await createUser(temp.value)
        getData()
        dialog.visible = false
      }
    })
  }

  return { handleCreate, createData }
}

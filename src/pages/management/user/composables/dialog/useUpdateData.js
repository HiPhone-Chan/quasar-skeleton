import { getCurrentInstance, nextTick } from 'vue';
import { updateUser } from '@/api/user'

export default function (temp, dialog, getData) {
  const instance = getCurrentInstance();

  const handleUpdate = (row) => {
    dialog.status = 'update'
    dialog.visible = true
    temp.value = Object.assign({}, row)

    nextTick(() => {
      instance.refs['dataForm'].clearValidate()
    })
  }

  const updateData = () => {
    instance.refs['dataForm'].validate(async valid => {
      if (valid) {
        await updateUser(temp.value)
        getData()
        dialog.visible = false
      }
    })
  }

  return { handleUpdate, updateData }
}

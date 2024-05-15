import { getCurrentInstance, nextTick } from 'vue';
import { updateUser } from '@/api/user';

export default function (temp, dialog, formName, getData) {
  const instance = getCurrentInstance();
  const STATUS_UPDATE = 'update';

  const handleUpdate = (row) => {
    dialog.status = STATUS_UPDATE;
    dialog.visible = true;
    temp.value = Object.assign({}, row);

    nextTick(() => {
      instance.refs[formName].clearValidate();
    });
  };

  const updateData = async () => {
    try {
      if(!await instance.refs[formName].validate()) {
        return;
      }
      await updateUser(temp.value);
      getData();
      dialog.visible = false;
    } catch (error) {
      console.log('updateData failed', error)
      const errType = Object.prototype.toString.call(error)
      switch (errType) {
        case '[object Object]': break; // 校验失败
      }
    }
  };

  return { handleUpdate, updateData, STATUS_UPDATE };
}

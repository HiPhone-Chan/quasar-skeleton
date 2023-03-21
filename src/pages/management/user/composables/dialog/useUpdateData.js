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

  const updateData = () => {
    instance.refs[formName].validate(async (valid) => {
      if (valid) {
        await updateUser(temp.value);
        getData();
        dialog.visible = false;
      }
    });
  };

  return { handleUpdate, updateData, STATUS_UPDATE };
}

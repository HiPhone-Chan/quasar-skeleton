import { getCurrentInstance, nextTick } from 'vue';
import { createRoleOptions } from '@/utils/user';
import { createUser } from '@/api/user';

export default function (temp, dialog, formName, getData) {
  const instance = getCurrentInstance();
  const STATUS_CREATE = 'create';

  const handleCreate = () => {
    dialog.status = STATUS_CREATE;
    dialog.visible = true;
    temp.value = {
      login: '',
      nickName: '',
      mobile: '',
      authorities: [createRoleOptions[0].value]
    };

    nextTick(() => {
      instance.refs[formName].clearValidate();
    });
  };

  const createData = () => {
    instance.refs[formName].validate(async (valid) => {
      if (valid) {
        await createUser(temp.value);
        getData();
        dialog.visible = false;
      }
    });
  };

  return { handleCreate, createData, STATUS_CREATE };
}

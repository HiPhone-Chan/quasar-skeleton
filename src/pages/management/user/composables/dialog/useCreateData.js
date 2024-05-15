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

  const createData = async () => {
    try {
      if (!await instance.refs[formName].validate()) {
        return;
      }
      await createUser(temp.value);
      getData();
      dialog.visible = false;
    } catch (error) {
      console.log('createData failed', error)
      const errType = Object.prototype.toString.call(error)
      switch (errType) {
        case '[object Object]': break; // 校验失败
      }
    }
  };

  return { handleCreate, createData, STATUS_CREATE };
}

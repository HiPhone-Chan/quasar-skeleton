import { createRoleOptions } from '@/utils/user';
import { createUser } from '@/api/user';

export const STATUS_CREATE = 'create';
export default function (openDialog, closeDialog, dialogForm, getData, formName) {
  const handleCreate = () => {
    dialogForm.value = {
      login: '',
      nickName: '',
      mobile: '',
      authorities: [createRoleOptions[0].value]
    };
    openDialog(STATUS_CREATE, formName);
  };

  const createData = async () => {
    try {
      await closeDialog(async () => {
        await createUser(dialogForm.value);
      }, formName);
      getData();
    } catch (error) {
      console.log('createData failed', error);
      const errType = Object.prototype.toString.call(error);
      switch (errType) {
        case '[object Object]':
          break; // 校验失败
      }
    }
  };

  return { handleCreate, createData };
}

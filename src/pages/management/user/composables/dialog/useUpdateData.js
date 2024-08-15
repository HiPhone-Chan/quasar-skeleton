import { updateUser } from '@/api/user';

export const STATUS_UPDATE = 'update';
export default function (openDialog, closeDialog, dialogForm, getData, formName) {
  const handleUpdate = (row) => {
    dialogForm.value = Object.assign({}, row);
    openDialog(STATUS_UPDATE, formName);
  };

  const updateData = async () => {
    try {
      await closeDialog(async () => {
        await updateUser(dialogForm.value);
      }, formName);
      getData();
    } catch (error) {
      console.log('updateData failed', error);
      const errType = Object.prototype.toString.call(error);
      switch (errType) {
        case '[object Object]':
          break; // 校验失败
      }
    }
  };

  return { handleUpdate, updateData };
}

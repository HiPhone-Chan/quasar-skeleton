import { updateUser } from '@/api/user';

export const STATUS_UPDATE = 'update';
export default function (openDialog, confirmDialog, dialogForm, getData, formName) {
  const handleUpdate = (row) => {
    dialogForm.value = Object.assign({}, row);
    openDialog(formName, STATUS_UPDATE);
  };

  const updateData = async () => {
    await confirmDialog(formName, async () => {
      await updateUser(dialogForm.value);
    });
    getData();
  };

  return { handleUpdate, updateData };
}

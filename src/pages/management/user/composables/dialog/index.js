import { ref, reactive, getCurrentInstance, nextTick } from 'vue';

export default function () {
  const dialogForm = ref({});

  const dialog = reactive({
    visible: false,
    status: ''
  });

  const instance = getCurrentInstance();

  const openDialog = (refName, status) => {
    dialog.status = status;
    dialog.visible = true;

    nextTick(() => {
      instance.refs[refName].clearValidate();
    });
  };

  const confirmDialog = async (refName, invokeFunc) => {
    if (!(await instance.refs[refName].validate())) {
      return;
    }
    await invokeFunc();
    dialog.visible = false;
  };

  return {
    dialog,
    dialogForm,
    openDialog,
    confirmDialog
  };
}

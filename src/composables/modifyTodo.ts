import {ref} from 'vue';
import {useStore} from 'vuex';
import {TodoInterface} from '@/types/task.interface';

export default function modifyTodo(modifyTaskId: any, isOpenModal: any): any {
  const todoList = ref<TodoInterface[]>([]);
  const store = useStore();

  const getList = () => {
    return store
      .dispatch('todos/AC_GET_TASKS')
      .then((result: any) => {
        if (result) {
          todoList.value = result;
        }
      })
      .catch((error: any) => {
        alert('Error\nOperation was rejected(updateTodoList) !!! \n' + error);
      });
  };

  const removeTask = (i: number) => {
    store
      .dispatch('todos/AC_DELETE_TASKS', i)
      .then((result) => {
        if (result) {
          todoList.value = result.tasksList;
        }
        // getList();
      })
      .catch((error) => {
        alert('Error\nOperation was rejected(removeTask) !!! \n' + error);
      });
  };

  const saveTask = () => {
    // setTimeout(removeClass, 3000, 'blink');
    getList();
    closeModalWindow();
  };

  const modifyTask = (taskId: number) => {
    modifyTaskId.value = taskId;
    isOpenModal.value = true;
  };

  const closeModalWindow = () => {
    isOpenModal.value = false;
    modifyTaskId.value = -1;
  };

  return {
    todoList,
    getList,
    removeTask,
    saveTask,
    modifyTask,
    closeModalWindow,
  };
}

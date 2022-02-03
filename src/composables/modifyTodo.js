import { ref, provide } from 'vue';
import { useStore } from 'vuex';
export default function modifyTodo() {
    const todoList = ref([]);
    const showLoader = ref(false);
    const store = useStore();
    const isOpenModal = ref(false);
    const modifyTaskId = ref(-1);
    const operation = ref('');
    provide('operation', operation);
    const getList = () => {
        operation.value = 'LOADING DATA...';
        showLoader.value = true;
        return store
            .dispatch('todos/AC_GET_TASKS')
            .then((result) => {
            if (result) {
                todoList.value = result;
                showLoader.value = false;
            }
        })
            .catch((error) => {
            alert('Error\nOperation was rejected(updateTodoList) !!! \n' + error);
        });
    };
    const removeTask = (i) => {
        operation.value = 'DELETING TASK...';
        showLoader.value = true;
        store
            .dispatch('todos/AC_DELETE_TASKS', i)
            .then((result) => {
            if (result) {
                todoList.value = result.tasksList;
                showLoader.value = false;
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
    const modifyTask = (taskId) => {
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
        showLoader,
        modifyTaskId,
        isOpenModal,
        operation,
    };
}
//# sourceMappingURL=modifyTodo.js.map
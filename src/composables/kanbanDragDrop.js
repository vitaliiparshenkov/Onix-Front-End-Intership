import { useStore } from 'vuex';
import { StatusEnum } from '@/types/task.interface';
export default function kanbanDragDrop(todoId, todoList, getList) {
    const store = useStore();
    const dragStart = (event) => {
        setTimeout(() => {
            event.target.classList.add('hide');
        }, 0);
        todoId = event.target.id.slice(7);
        // todoId = event.target.id;
    };
    const dragEnd = (event) => {
        event.target.classList.remove('hide');
        ``;
    };
    const dragDrop = (event) => {
        event.preventDefault();
        const zone = event.currentTarget.className;
        if (todoId != -1 && zone) {
            const changesObject = { ...todoList.value.find((item) => item.taskId == todoId) };
            switch (zone) {
                case StatusEnum.Todo:
                    if (changesObject.status != StatusEnum.Done) {
                        changesObject.status = StatusEnum.Todo;
                    }
                    break;
                case StatusEnum.Inprogress:
                    changesObject.status = StatusEnum.Inprogress;
                    break;
                case StatusEnum.Done:
                    changesObject.status = StatusEnum.Done;
                    break;
            }
            store
                .dispatch('todos/AC_MODIFY_TODO', { id: changesObject.taskId, task: { ...changesObject } })
                .then(() => {
                getList().then(() => {
                    const item = document.querySelector('#todoId_' + todoId);
                    if (item != null) {
                        item.classList.add('selected');
                    }
                });
            })
                .catch((error) => {
                alert('Error\nOperation was rejected(DragDrop) !!! \n' + error);
            });
        }
        // setTimeout(() => {
        //   const item = document.querySelector('#todoId_' + todoId);
        //   if (item != null) {
        //     item.classList.add('selected');
        //   }
        // }, 0);
    };
    return {
        dragStart,
        dragEnd,
        dragDrop,
    };
}
//# sourceMappingURL=kanbanDragDrop.js.map
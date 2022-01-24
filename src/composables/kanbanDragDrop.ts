import {useStore} from 'vuex';
import {StatusEnum} from '@/types/task.interface';

export default function kanbanDragDrop(todoId: number): any {
  const store = useStore();

  const dragStart = (event: any) => {
    setTimeout(() => {
      event.target.classList.add('hide');
    }, 0);
    todoId = event.target.id.slice(7);
  };

  const dragEnd = (event: any) => {
    event.target.classList.remove('hide');
  };

  const dragDrop = (event: any) => {
    event.preventDefault();
    const zone = event.currentTarget.className;
    if (todoId != -1 && zone) {
      const changesObject = {...store.state.todos.todoList[todoId]};
      switch (zone) {
        case StatusEnum.Todo:
          if (store.state.todos.todoList[todoId].status != StatusEnum.Done) {
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

      store.dispatch('todos/AC_MODIFY_TODO', {id: todoId, task: {...changesObject}});
    }
    setTimeout(() => {
      const item = document.querySelector('#todoId_' + todoId);
      if (item != null) {
        item.classList.add('selected');
      }
    }, 0);
  };

  return {
    dragStart,
    dragEnd,
    dragDrop,
  };
}

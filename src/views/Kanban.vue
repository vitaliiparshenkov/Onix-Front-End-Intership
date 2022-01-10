<template lang="pug">
modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@save-task="saveTask" @cancel="closeModalWindow" :modify-task="changeTask")

.flex-container
  .todo(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box To Do
      p.header-box-count -&nbsp;{{getCountTodoStatus('todo')}}&nbsp;-
    .task-box(v-for="(todo, todoId) of getTodoType('todo')" :key="todo" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoList.indexOf(todo)")
      i.status.fas.fa-hourglass-end
      p.name.deadline {{ todo.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ todo.completionDate.toString().substr(4, 11) }}
      i.modify.fas.fa-pen(@click="modifyTask(todo)")
  .inprogress(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box In Progress
      p.header-box-count -&nbsp;{{getCountTodoStatus('inprogress')}}&nbsp;-
    .task-box(v-for="(inprogress, inprogressId) of getTodoType('inprogress')" :key="inprogress" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoList.indexOf(inprogress)")
      i.status.fas.fa-calendar-alt
      p.name {{ inprogress.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ inprogress.completionDate.toString().substr(4, 11) }}
      i.modify.fas.fa-pen(@click="modifyTask(inprogress)")
  .done(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box Done
      p.header-box-count -&nbsp;{{getCountTodoStatus('done')}}&nbsp;-
    .task-box(v-for="(done, doneId) of getTodoType('done')" :key="done" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoList.indexOf(done)")
      i.status.fas.fa-calendar-day
      p.name.lastday {{ done.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ done.completionDate.toString().substr(4, 11) }}
      i.modify.fas.fa-pen(@click="modifyTask(done)")
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface, StatusEnum} from '@/types/task.interface';
import dateInStringFormat from '@/mixins/dateInStringFormat';
import AddEditTask from '@/components/AddEditTask.vue';
import ModalWindow from '@/components/ModalWindow.vue';

let todoId = -1;

export default defineComponent({
  data() {
    return {
      filterSelect: 'all',
      todoList: [] as TodoInterface[],
      isOpenModal: false,
      changeTask: {} as TodoInterface,
      changeTaskId: -1,
    };
  },

  name: 'kanban',
  components: {
    'add-edit-task': AddEditTask,
    'modal-window': ModalWindow,
  },

  props: ['todoListGlobal'],

  mixins: [dateInStringFormat],

  emits: {
    todoListGlobalUpdate: null,
    'change-notifis': null,
  },

  methods: {
    saveTask(task: TodoInterface): void {
      this.todoList[this.changeTaskId] = task;
      this.closeModalWindow();
    },

    modifyTask(task: TodoInterface) {
      this.changeTask = task;
      this.changeTaskId = this.todoList.indexOf(task);
      this.isOpenModal = true;
    },

    closeModalWindow() {
      this.isOpenModal = false;
      this.changeTask = {} as TodoInterface;
      this.changeTaskId = -1;
    },

    getTodoType(status: string) {
      return this.todoList.filter((el) => el.status === status);
    },

    getCountTodoStatus(status: string) {
      return this.todoList.filter((el) => el.status === status).length;
    },

    dragStart(event: any) {
      setTimeout(() => {
        event.target.classList.add('hide');
      }, 0);
      todoId = event.target.id.slice(7);
    },

    dragEnd(event: any) {
      event.target.classList.remove('hide');
    },

    dragEnter(event: any) {
      // event.currentTarget.classList.add('hovered');
    },

    dragLeave(event: any) {
      // event.currentTarget.classList.remove('hovered');
    },

    dragDrop(event: any) {
      event.preventDefault();
      const zone = event.currentTarget.className;
      if (todoId != -1 && zone) {
        switch (zone) {
          case StatusEnum.Todo:
            if (this.todoList[todoId].status != StatusEnum.Done) {
              this.todoList[todoId].status = StatusEnum.Todo;
            }
            break;
          case StatusEnum.Inprogress:
            this.todoList[todoId].status = StatusEnum.Inprogress;
            break;
          case StatusEnum.Done:
            this.todoList[todoId].status = StatusEnum.Done;
            break;
        }
      }
      setTimeout(() => {
        let item = document.querySelector('#todoId_' + todoId);
        if (item != null) {
          item.classList.add('selected');
        }
      }, 0);
    },
  },

  created() {
    this.todoList = this.todoListGlobal;
  },
  beforeUnmount() {
    this.$emit('todoListGlobalUpdate', this.todoList);
  },

  computed: {
    // getTodo() {
    //   return this.todoList.filter((el) => el.status === 'todo');
    // },
    //
    // getInprogress() {
    //   return this.todoList.filter((el) => el.status === 'inprogress');
    // },
    //
    // getDone() {
    //   return this.todoList.filter((el) => el.status === 'done');
    // },
  },
});
</script>

<style lang="scss" scoped>
.selected {
  animation: scale_ .7s linear alternate;
  animation-iteration-count: 1;
}

@keyframes scale_ {
  50% {
    transform: scale(1.1);
  }
}

.hide {
  opacity: 0.2;
}

.lock {
  overflow: hidden;
  position: fixed;
}

.flex-container {
  display: flex;
  justify-content: space-between;

  .todo,
  .inprogress,
  .done {
    flex: 0 0 32%;
    padding: 5px 8px;
    border: 1px solid #000000;
    -webkit-box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);

    &.hovered {
      opacity: 0.5;
    }

    .header-box {
      text-align: center;
      font-weight: 600;
      text-transform: uppercase;
      padding: 15px 0;
      border-bottom: 5px solid #753ad7;

      .header-box-count {
        font-size: 15px;
        font-weight: 400;
        line-height: 15px;
      }
    }

    .task-box {
      position: relative;
      margin: 10px 0;
      border: 1px solid #000000;
      background-color: white;
      padding: 5px;
      border-radius: 3px;
      cursor: move;
      transition: 0.3s ease-out;

      i.modify {
        position: absolute;
        right: 5px;
        bottom: 2px;
        padding: 5px;
        border-radius: 3px;
        transition: 0.3s ease-out;
        cursor: pointer;

        &:hover {
          background-color: #eaeaea;
          color: #753ad7;
        }
      }

      i.status {
        position: absolute;
        color: limegreen;

        &.fa-calendar-day{
          color: #ffc200;
        }

        &.fa-hourglass-end{
          color: red;
        }
      }

      time {
        text-align: right;
        font-size: 13px;
        line-height: 19px;
        font-weight: 300;
        color: rgb(147, 147, 153);
      }

      .name {
        margin-bottom: 5px;
        padding-bottom: 3px;
        border-bottom: 1px solid rgb(133, 133, 133);
        text-indent: 22px;
        line-height: 16px;

        &.deadline{
          border-bottom: 2px solid red;
        }

        &.lastday{
          border-bottom: 2px solid #ffc200;
        }
      }

      &:hover {
        background-color: #fff8dd;
      }
    }
  }

  .todo {
    background-color: #2b96d9;
  }

  .inprogress {
    background-color: #ffc200;
  }

  .done {
    background-color: #0abf8c;
  }
}

.noTasks {
  border-top: 2px solid darkred;
  margin-top: 25px;
  padding-top: 5px;
  text-align: center;
}

.select {
  text-align: right;

  select {
    background-color: #ffc200;
    padding: 3px 10px;
    font-size: 13px;
    line-height: 14px;
    width: 100%;
    max-width: 200px;

    option {
      border-top: 1px solid #cccccc;
    }
  }
}

table {
  margin-top: 15px;
  width: 100%;
  /*width: 33.33%;*/
  border-collapse: collapse;

  tr {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;

    td,
    th {
      padding: 5px;

      &.date,
      &.status {
        text-align: center;
      }
    }

    th {
      background: #fff8dd;
    }

    td {
      /*width: 33.33%;*/
    }
  }
}

@media only screen and (max-width: 500px) {
  /*.select select {*/
  /*max-width: 100%;*/
  /*}*/
  .flex-container {
    flex-flow: column nowrap;

    & > * {
      margin-bottom: 25px;
    }
  }
}
</style>

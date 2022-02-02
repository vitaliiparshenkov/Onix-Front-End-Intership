<template lang="pug">
modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@save-task="saveTask" @cancel="closeModalWindow" :modify-task-id="modifyTaskId")

form#search(@submit.prevent="onSubmitSearch")
  input(type="search" v-model="search" placeholder="Search here...")
  .group-btn
    button.clear(type="button" @click="onClearInputSearch")
      i.fas.fa-times
    button.month(type="button" @click="showDateString")
      i.far.fa-calendar-alt
    button.search
      i.fas.fa-search

.serchDateBox(:class="{hide: serchDateBoxHide}")
  datepicker(v-model="date" range position="right" closeOnScroll autoApply placeholder="Select Date" :format="format")

.flex-container
  div(v-for="status in StatusEnum" :class="status" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box {{status}}
      p.header-box-count -&nbsp;{{getCountTodoStatus(status)}}&nbsp;-
    .task-box(v-for="todo of getTodoType(status)" :key="todo" :class="getClassDependentOn(status)" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_'+todo.taskId")
      i.status.fas(:class="getClassStatus(todo.completionDate)" v-if="status != StatusEnum.Done")
      i.status.far.fa-calendar-check(v-else)
      p.name {{ todo.name }}
      strong
        <!--time(datetime="2010-07-26T23:42+03:00") {{ todo.completionDate.toString().substr(4, 11) }}-->
        time(datetime="2010-07-26T23:42+03:00") {{ todo.completionDate }}
      i.modify.fas.fa-pen(@click="modifyTask(todo.taskId)" v-if="status != StatusEnum.Done")

</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue';
import {StatusEnum} from '@/types/task.interface';
import AddEditTask from '@/components/AddEditTask.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import kanbanDragDrop from '@/composables/kanbanDragDrop';
import kanbanMethods from '@/composables/kanbanMethods';
import modifyTodo from '@/composables/modifyTodo.ts';

export default defineComponent({
  setup() {
    let todoId = -1;
    const date = ref([]);
    const search = ref('');
    const isOpenModal = ref(false);
    const serchDateBoxHide = ref(true);
    const modifyTaskId = ref(-1);
    // let todoList = ref<TodoInterface[]>([]);

    const {todoList, getList, saveTask, closeModalWindow, modifyTask} = modifyTodo(modifyTaskId, isOpenModal);

    getList();

    const {dragStart, dragEnd, dragDrop} = kanbanDragDrop(todoId, todoList, getList);
    const {
      onSubmitSearch,
      format,
      showDateString,
      onClearInputSearch,
      getClassDependentOn,
      getClassStatus,
      getTodoType,
      getCountTodoStatus,
    } = kanbanMethods(date, search, serchDateBoxHide, todoList);

    watchEffect(() => {
      if (date.value === null) {
        date.value = [];
      }
      onSubmitSearch();
    });

    return {
      StatusEnum,
      date,
      search,
      isOpenModal,
      modifyTaskId,
      serchDateBoxHide,
      todoList,

      dragStart,
      dragEnd,
      dragDrop,

      onSubmitSearch,
      format,
      showDateString,
      onClearInputSearch,
      getClassDependentOn,
      getClassStatus,
      getTodoType,
      getCountTodoStatus,
      modifyTask,
      saveTask,
      closeModalWindow,
    };
  },

  components: {
    'add-edit-task': AddEditTask,
    'modal-window': ModalWindow,
    datepicker: Datepicker,
  },
});
</script>

<style lang="scss">
.selected {
  animation: scale_ 0.7s linear alternate;
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

.serchDateBox {
  transition: all 0.6s cubic-bezier(0, 0.8, 0, 1);
  margin-bottom: 20px;
  margin-top: -2px;
  border-bottom: 1px solid #ffc200;
  height: 35px;

  &.hide {
    height: 0;
    margin-left: 100%;
    overflow: hidden;
  }

  .dp__main {
    .dp__input {
      font-family: 'Helvetica', Arial, sans-serif;
      font-size: 13px;
      border: none;
    }
  }
}

#search {
  position: relative;
  width: 100%;
  margin: 0 auto 0px;
  height: 41px;

  input {
    top: 0;
    right: 0;
    height: 38px;
    width: 100%;
    padding: 0 40px 0 0;
    outline: none;
    background: transparent;
    transition: 0.6s cubic-bezier(0, 0.8, 0, 1);
    border-bottom: 2px solid transparent;
    cursor: pointer;

    padding-left: 15px;
    border-bottom: 2px solid #ffc200;
    border-top: 1px solid #ffc200;

    &:focus {
      padding-left: 15px;
      border-bottom: 2px solid #ffc200;
      border-top: 1px solid #ffc200;

      cursor: text;
      padding-right: 55px;
    }
  }

  .group-btn {
    position: absolute;
    top: 1px;
    right: 0;

    button {
      background: #e3efff;
      border: none;
      height: 35px;
      width: 35px;
      padding: 3px;
      transition: 0.3s linear;

      &:not(:last-child) {
        border-right: 1px solid #cccccc;
      }

      &:hover {
        background: #fff8dd;
      }
    }
  }
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
    -webkit-box-shadow: 2px 4px 0 0 rgba(0, 0, 0, 1);
    -moz-box-shadow: 2px 4px 0 0 rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 0 0 rgba(0, 0, 0, 1);

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
      box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.3);
      overflow: hidden;

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

        &.fa-calendar-day {
          color: #ffc200;
        }

        &.fa-hourglass-end {
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
      }

      &:hover {
        background-color: #fff8dd;
      }
    }

    .to-do {
      box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3), 1px 1px 5px rgba(255, 255, 255, 1);
    }

    .in-progress {
      /*clip-path: polygon(30px 0%, 100% 0%, 100% 100%, 30px 100%, 0 50%);*/
      /*background: white;*/
      /*background:linear-gradient(-150deg, #58a 23px, white 0);*/
    }

    .do-ne {
      /*background: white;*/
      /*background:linear-gradient(-45deg, #58a 15px, white 0);*/

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-bottom: 21px solid #58a;
        border-left: 21px solid transparent;
        -webkit-box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
        box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
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
  .flex-container {
    flex-flow: column nowrap;

    & > * {
      margin-bottom: 25px;
    }
  }
}
</style>

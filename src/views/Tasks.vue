<template lang="pug">

modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@save-task="saveTask" @cancel="closeModalWindow" :modify-task-id="modifyTaskId")

div.task-header-container
  h1.todo-list Todo List
  button.add-new-task(@click="isOpenModal = true" :class="{active: isOpenModal}")
    i.fas.fa-plus
hr
transition-group(tag="ul" name="list-complete" v-if="todoList.length")
  loader(v-show="showLoader")
    template(v-slot:operation) {{operation}}
  li(v-for="(task, taskId) of todoList" :key="task" class="blink- list-complete-item" :ref="el => { if (el) elList[taskId] = el }")
    .li
      span.task(:class="{done: isTodoStatusDone(task.status)}" @click.prevent="modifyTask(task.taskId)")
        input(type="checkbox" @change="task.completed = !task.completed" :id="`task-${taskId}`" :checked="isTodoStatusDone(task.status)")
        label(:for="`task-${taskId}`")
          strong() {{ task.name }}&ensp;
          time(datetime="2010-07-26T23:42+03:00") ({{ task.completionDate }})
          i(v-if="task.status === StatusEnum.Todo") &ensp;:Todo
          i(v-else-if="task.status === StatusEnum.Inprogress") &ensp;:Inprogress
          i(v-else="task.status === StatusEnum.Done") &ensp;:Done
      span.panel
        button.watch(@click="task.show = !task.show") &#128269;
        button.delete(@click="removeTask(task.taskId)") &times;
    div(:class="['desc', {completed: isTodoStatusDone(task.status)}]" v-show="task.show")
      |{{ task.desc }}
div(v-else)
  hr
  h3(class="noTasks") No tasks!
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import AddEditTask from '@/components/AddEditTask.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import Loader from '@/components/PageLoader.vue';
import taskMethods from '@/composables/taskMethods';
import {StatusEnum} from '@/types/task.interface';
import modifyTodo from '@/composables/modifyTodo.ts';

export default defineComponent({
  setup() {
    const elList = ref([]);
    // const isOpenModal = ref(false);
    // const modifyTaskId = ref(-1);
    // const showLoader = ref(true);

    const {
      todoList,
      getList,
      removeTask,
      saveTask,
      closeModalWindow,
      modifyTask,
      showLoader,
      modifyTaskId,
      isOpenModal,
      operation,
    } = modifyTodo();

    getList();

    const {
      // goByElem,
      // removeClass,
      isTodoStatusDone,
    } = taskMethods(elList);

    onMounted(() => {
      // removeClass('blink');
      // goByElem();
    });

    return {
      StatusEnum,
      elList,
      isOpenModal,
      modifyTaskId,
      isTodoStatusDone,
      todoList,
      showLoader,

      saveTask,
      modifyTask,
      removeTask,
      closeModalWindow,
      operation,
    };
  },

  components: {
    'add-edit-task': AddEditTask,
    'modal-window': ModalWindow,
    loader: Loader,
  },
});
</script>

<style lang="scss" scoped>
.lock {
  overflow: hidden;
  position: fixed;
}

.task-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;

  .add-new-task {
    padding: 4px 6px;
    border: 1px solid #ccc;
    transition: 0.3s ease-out;

    i {
      transition: 0.3s ease-out;
    }

    &:hover,
    &.active {
      background-color: #fff8dd;

      i {
        transform: rotate(45deg);
        color: darkred;
      }
    }
  }
}

.noTasks {
  border-top: 2px solid darkred;
  margin-top: 25px;
  padding-top: 5px;
  text-align: center;
}

ul {
  margin-top: 30px;
  position: relative;

  li {
    border: 1px solid #ccc;
    padding: 10px 25px;
    margin-bottom: 1rem;
    /*display: inline-block;*/
    /*width: 100%;*/

    .li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      span.task {
        margin-right: 90px;
        display: flex;
        overflow: hidden;
        transition: 0.3s ease-out;

        label {
          strong,
          time,
          i {
            line-height: 18px;
          }

          i {
            opacity: 0.5;
          }
        }

        :hover {
          cursor: pointer;
          background: #fff8dd;
        }
      }

      span.panel {
        min-width: 67px;
        position: absolute;
        right: 0;
      }

      input {
        margin-right: 1rem;
      }

      .delete {
        border: 1px solid #cccccc;
        padding: 4px 8px;
        margin-left: 15px;
        /*background: #0060df;*/
        background: #eaeaea;
        color: red;
        font-weight: bold;

        &:hover {
          background-color: #ffc200;
          border: 1px solid #ccc;
          transition: 0.3s ease-out;
        }
      }

      time {
        text-decoration: underline;
      }

      .watch {
        /*margin-left: 15px;*/
        padding: 3px 5px;
        border: 1px solid #ccc;
        transition: 0.3s ease-out;
      }

      .done {
        text-decoration: line-through;
      }
    }

    .desc {
      flex-basis: 100%;
      background: #eaeaea;
      margin: 15px 0 10px;
      padding: 10px;
      line-height: 16px;

      &.completed {
        transition: all 0.3s;
        opacity: 0.5;
      }
    }
  }
}

.list-complete-item {
  transition: all 0.5s ease;
  display: inline-block;
  width: 100%;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.blink {
  border: 2px solid #ffc200;
  animation: blink 0.7s linear infinite;
}

@keyframes blink {
  50% {
    opacity: 0.55;
  }
}

.scale {
  animation: goToElem 0.5s ease-out 1;
}

@keyframes goToElem {
  from {
    transform: scale(1);
    border: 1px solid #ffc200;
    /*transform: scale(1) translate(30px, 20px) rotate(20deg);*/
  }
  /*50% {transform: scale(1.2) translate(15px, 10px) rotate(10deg);}*/
  50% {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
    /*transform: scale(1) translate(0) rotate(0deg);*/
    border: 1px solid #ccc;
  }
}

@media only screen and (max-width: 480px) {
  ul > li {
    padding: 10px;
  }
}
</style>

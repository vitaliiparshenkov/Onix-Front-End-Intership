<template lang="pug">
modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@save-task="saveTask" @cancel="closeModalWindow" :modify-task="changeTask")

div.task-header-container
  h1.todo-list Todo List
  button.add-new-task(@click="isOpenModal = true" :class="{active: isOpenModal}")
    i.fas.fa-plus
hr
transition-group(tag="ul" name="list-complete" v-if="todoList.length")
  li(v-for="(todo, taskId) of todoList" :key="todo" class="blink list-complete-item" :ref="el => { if (el) elList[taskId] = el }")
    .li
      span.task(:class="{done: todo.status === 'done'}" @click.prevent="modifyTask(todo)")
        input(type="checkbox" @change="todo.completed = !todo.completed" :id="`task-${taskId}`" :checked="todo.status === 'done'")
        label(:for="`task-${taskId}`")
          strong() {{ todo.name }}&ensp;
          time(datetime="2010-07-26T23:42+03:00") ({{ getDateInStringFormat(todo.completionDate) }})
          <!--time(datetime="2010-07-26T23:42+03:00") ({{ todo.completionDate }})-->
          i(v-if="todo.status === 'todo'") &ensp;:Todo
          i(v-else-if="todo.status === 'inprogress'") &ensp;:Inprogress
          i(v-else="todo.status === 'done'") &ensp;:Done
      span.panel
        button.watch(@click="todo.show = !todo.show") &#128269;
        button.delete(@click="removeTask(taskId)") &times;
    div(:class="['desc', {completed: todo.status === 'done'}]" v-show="todo.show")
      |{{ todo.desc }}
div(v-else)
  hr
  h3(class="noTasks") No tasks!
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {TodoInterface} from '@/types/task.interface';
import dateInStringFormat from '@/mixins/dateInStringFormat';
import AddEditTask from '@/components/AddEditTask.vue';
import ModalWindow from '@/components/ModalWindow.vue';

export default defineComponent({
  // setup() {
  // const elList = ref([]);
  // return {elList};
  // },

  data() {
    return {
      todoList: [] as TodoInterface[],
      elList: ref([]),
      isOpenModal: false,
      changeTask: {} as TodoInterface,
      changeTaskId: -1,
    };
  },

  // name: 'tasks',
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
      if (task.taskId == -1) {
        let newId = this.todoList.length;
        while (this.todoList.findIndex((t) => t.taskId == newId) != -1) {
          newId++;
        }
        task.taskId = newId;
        this.todoList.push(task);
      } else {
        this.todoList[this.changeTaskId] = task;
      }
      setTimeout(this.removeClass, 3000, 'blink');
      this.closeModalWindow();
    },

    modifyTask(task: TodoInterface) {
      this.changeTask = task;
      this.changeTaskId = this.todoList.indexOf(task);
      this.isOpenModal = true;
    },

    removeTask(i: number): void {
      this.todoList.splice(i, 1);
    },

    closeModalWindow() {
      this.isOpenModal = false;
      if (this.changeTaskId != -1) {
        this.changeTask = {} as TodoInterface;
        this.changeTaskId = -1;
      }
    },

    goByElem() {
      for (let i = 0; i < this.elList.length; i++) {
        let el: HTMLElement = this.elList[i];
        if (el) {
          setTimeout(() => {
            el.classList.add('scale');
          }, i * 200);
        }
      }
      setTimeout(this.removeClass, (this.elList.length - 1) * 500, 'scale');
    },

    removeClass(className: string) {
      let el: HTMLElement;
      for (let i = 0; i < this.elList.length; i++) {
        el = this.elList[i];
        if (el) {
          el.classList.remove(className);
        }
      }
    },
  },

  beforeCreate() {
    // console.log('beforeCreate()');
  },
  created: function () {
    // console.log('created()');
    this.todoList = this.todoListGlobal;
  },
  beforeMount() {
    // console.log('beforeMount()');
  },
  mounted() {
    // console.log('mounted()');
    this.removeClass('blink');
    this.goByElem();
  },
  beforeUpdate() {
    // console.log('beforeUpdate()');
  },
  updated() {
    // console.log('updated()');
  },
  beforeUnmount() {
    // console.log('beforeUnmount()');
    this.$emit('todoListGlobalUpdate', this.todoList);
  },
  unmounted() {
    // console.log('unmounted()');
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

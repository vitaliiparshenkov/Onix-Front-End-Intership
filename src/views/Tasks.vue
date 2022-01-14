<template lang="pug">
modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@save-task="saveTask" @cancel="closeModalWindow" :modify-task-id="modifyTaskId" :todoListGlobal="todoListGlobal")

div.task-header-container
  h1.todo-list Todo List
  button.add-new-task(@click="isOpenModal = true" :class="{active: isOpenModal}")
    i.fas.fa-plus
hr
transition-group(tag="ul" name="list-complete" v-if="todoListGlobal.length")
  li(v-for="(task, taskId) of todoListGlobal" :key="task" class="blink list-complete-item" :ref="el => { if (el) elList[taskId] = el }")
    .li
      span.task(:class="{done: isTodoStatusDone(task.status)}" @click.prevent="modifyTask(taskId)")
        input(type="checkbox" @change="task.completed = !task.completed" :id="`task-${taskId}`" :checked="isTodoStatusDone(task.status)")
        label(:for="`task-${taskId}`")
          strong() {{ task.name }}&ensp;
          time(datetime="2010-07-26T23:42+03:00") ({{ getDateInStringFormat(task.completionDate) }})
          i(v-if="task.status === StatusEnum.Todo") &ensp;:Todo
          i(v-else-if="task.status === StatusEnum.Inprogress") &ensp;:Inprogress
          i(v-else="task.status === StatusEnum.Done") &ensp;:Done
      span.panel
        button.watch(@click="task.show = !task.show") &#128269;
        button.delete(@click="removeTask(taskId)") &times;
    div(:class="['desc', {completed: isTodoStatusDone(task.status)}]" v-show="task.show")
      |{{ task.desc }}
div(v-else)
  hr
  h3(class="noTasks") No tasks!
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {TodoInterface, StatusEnum} from '@/types/task.interface';
import dateInStringFormat from '@/mixins/dateInStringFormat';
import AddEditTask from '@/components/AddEditTask.vue';
import ModalWindow from '@/components/ModalWindow.vue';
// import {mapState} from 'vuex';

export default defineComponent({
  data() {
    return {
      StatusEnum,
      elList: ref([]),
      isOpenModal: false,
      modifyTaskId: -1,
    };
  },

  components: {
    'add-edit-task': AddEditTask,
    'modal-window': ModalWindow,
  },

  props: ['todoListGlobal'],

  mixins: [dateInStringFormat],

  emits: {
    'change-notifis': null,
    'remove-task': null,
    'save-task': null,
  },

  methods: {
    modifyTask(taskId: number) {
      this.modifyTaskId = taskId;
      this.isOpenModal = true;
    },

    saveTask(task: TodoInterface): void {
      this.$emit('save-task', task);
      setTimeout(this.removeClass, 3000, 'blink');
      this.closeModalWindow();
    },

    removeTask(i: number): void {
      this.$emit('remove-task', i);
    },

    closeModalWindow() {
      this.isOpenModal = false;
      if (this.modifyTaskId != -1) {
        this.modifyTaskId = -1;
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

    isTodoStatusDone(status: StatusEnum): boolean {
      if (status === StatusEnum.Done) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    // console.log('mounted()');
    this.removeClass('blink');
    this.goByElem();
  },

  computed: {
    //--- 1 variant
    // ...mapState(['todoList']),

    //--- 2 variant
    // ...mapState({
    //   todoList(state: any): any {
    //     return state.todoList;
    //   },
    // }),

    //--- 3 variant
    // todoList(): any {
    //   return this.$store.state.todoList;
    // },
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

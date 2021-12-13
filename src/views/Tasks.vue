<template lang="pug">
h1 Todo List
hr
add-task(@add-task="addTask")
transition-group(tag="ul" name="list-complete" v-if="todoList.length")
  <!--li(v-for="(todo, taskId) of todoList" :key="taskId" class="blink" :ref="`todoItem-${taskId}`")-->
  li(v-for="(todo, taskId) of todoList" :key="todo" class="blink list-complete-item" :ref="el => { if (el) elList[taskId] = el }")
    .li
      span.task(:class="{done: todo.completed}")
        input(type="checkbox" @change="todo.completed = !todo.completed" :id="`task-${taskId}`")
        label(:for="`task-${taskId}`")
          strong() {{ todo.name }}
            time(datetime="2010-07-26T23:42+03:00") ({{ todo.completionDate }})
      span.panel
        button.watch(@click="todo.show = !todo.show") &#128269;
        button.delete(@click="removeTask(taskId)") &times;
    div(:class="['desc', {completed: todo.completed}]" v-show="todo.show")
      |{{ todo.desc }}
div(v-else)
  hr
  h3(class="noTasks") No tasks!
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {TodoInterface} from '@/types/task.interface';
import AddTask from '@/components/AddTask.vue';
export default defineComponent({
  // setup() {
  // const elList = ref([]);
  // return {elList};
  // },

  data() {
    return {
      todoList: [] as TodoInterface[],
      elList: ref([]),
    };
  },

  methods: {
    removeTask(i: number): void {
      this.todoList.splice(i, 1);
    },

    addTask(task: TodoInterface): void {
      this.todoList.push(task);
      setTimeout(this.removeClass, 3000, 'blink');
    },

    goByElem() {
      for (let i = 0; i < this.elList.length; i++) {
        let el: any = this.elList[i];
        if (el) {
          setTimeout(()=>{el.classList.add('scale');}, i * 200);
        }
      }
      setTimeout(this.removeClass, (this.elList.length - 1) * 500, 'scale');
    },

    removeClass(clasName: string) {
      let el: any;
      for (let i = 0; i < this.elList.length; i++) {
        el = this.elList[i];
        if (el) {
          el.classList.remove(clasName);
        }
      }
    },
  },

  components: {
    'add-task': AddTask,
  },

  beforeCreate() {
    // console.log('beforeCreate()');
  },
  created() {
    // console.log('created()');
    this.todoList = [
      {
        name: 'Доделать домашнее задание №3',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '02-11-2021',
        completed: false,
        show: false,
      },
      {
        name: 'Сделать домашнее задание №4',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '05-11-2021',
        completed: false,
        show: false,
      },
      {
        name: 'Закончить Onix front-end Intership',
        desc: 'Получить диплом(грамоту)',
        completionDate: '31-12-2021',
        completed: false,
        show: false,
      },
      {
        name: 'Попасть в onix team',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '31-01-2022',
        completed: false,
        show: false,
      },
      {
        name: 'Получить offer',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '15-01-2022',
        completed: false,
        show: false,
      },
      {
        name: 'Пройти испытательный срок',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '15-04-2022',
        completed: false,
        show: false,
      },
      {
        name: 'Договориться о высокой ЗП',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '10-01-2022',
        completed: false,
        show: false,
      },
      {
        name: 'Полноценно приступить к работе',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '10-01-2022',
        completed: false,
        show: false,
      },
    ];
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
  },
  unmounted() {
    // console.log('unmounted()');
  },
  emits: ['changeNotifis'],
});
</script>

<style lang="scss" scoped>
h1 {
  border-bottom: 1px solid #cccccc;
}

.noTasks{
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

@media only screen and (max-width: 480px) {
  ul > li {
    padding: 10px;
  }
}

.list-complete-item{
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
  animation: blink .7s linear infinite;
}

@keyframes blink {
  50% {
    opacity: 0.55;
  }
}

.scale {
  animation: goToElem .5s ease-out 1;
}

@keyframes goToElem {
  from {
    transform: scale(1);
    border: 1px solid #ffc200;
    /*transform: scale(1) translate(30px, 20px) rotate(20deg);*/
  }
  /*50% {transform: scale(1.2) translate(15px, 10px) rotate(10deg);}*/
  50% {transform: scale(1.3);}
  to {
    transform: scale(1);
    /*transform: scale(1) translate(0) rotate(0deg);*/
    border: 1px solid #ccc;
  }
}
</style>

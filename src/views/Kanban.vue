<template lang="pug">
.flex-container
  .todo
    h2.header-box To Do
    .task-box(v-for="(todo, todoId) of getTodo" :key="todo")
      p.name {{ todo.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") ({{ todo.completionDate }})
  .inprogress
    h2.header-box In Progress
    .task-box(v-for="(inprogress, inprogressId) of getInprogress" :key="inprogress")
      p.name {{ inprogress.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") ({{ inprogress.completionDate }})
  .done
    h2.header-box Done
    .task-box(v-for="(done, doneId) of getDone" :key="done")
      p.name {{ done.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") ({{ done.completionDate }})
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface} from '@/types/task.interface';

export default defineComponent({
  data() {
    return {
      filterSelect: 'all',
      todoList: [] as TodoInterface[],
      nowDate: new Date(),
    };
  },
  emits: ['changeNotifis', 'todoListGlobalUpdate'],
  props: ['todoListGlobal'],
  computed: {
    getTodo() {
      let currDate = new Date(
        this.nowDate.getMonth() + 1 + '/' + this.nowDate.getDate() + '/' + this.nowDate.getFullYear(),
      );
      return this.todoListGlobal.filter(
        (el: TodoInterface) => el.status === 'todo' && new Date(el.completionDate) >= currDate,
      );
    },

    getInprogress() {
      let currDate = new Date(
        this.nowDate.getMonth() + 1 + '/' + this.nowDate.getDate() + '/' + this.nowDate.getFullYear(),
      );
      return this.todoListGlobal.filter(
        (el: TodoInterface) => el.status === 'inprogress' && new Date(el.completionDate) >= currDate,
      );
    },

    getDone() {
      let currDate = new Date(
        this.nowDate.getMonth() + 1 + '/' + this.nowDate.getDate() + '/' + this.nowDate.getFullYear(),
      );
      return this.todoListGlobal.filter(
        (el: TodoInterface) => el.status === 'done' && new Date(el.completionDate) >= currDate,
      );
    },
  },
  name: 'kanban',

  created() {
    this.todoList = this.todoListGlobal;
  },
});
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: space-between;

  .todo,
  .inprogress,
  .done {
    flex: 0 0 32%;
    padding: 5px 8px;
    border: 1px solid #000000;
    /*border-radius: 10px;*/
    -webkit-box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 1);

    .header-box {
      text-align: center;
      font-weight: 600;
      text-transform: uppercase;
      padding: 15px 0;
      border-bottom: 5px solid #753ad7;
    }

    .task-box {
      margin: 10px 0;
      border: 1px solid #000000;
      background-color: white;
      padding: 5px;
      border-radius: 3px;
      cursor: pointer;

      .name,
      time {
        line-height: 17px;
      }

      time {
        text-align: right;
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

<template>
  <h1>Todo List</h1>
  <hr color="red" size="2px">
  <ul>
    <li v-for="(todo, i) of todoList" :key="i">
      <div class="li">
        <span :class="{done: todo.completed}">
          <input type="checkbox" @change="todo.completed = !todo.completed" :id="'task_' + i">
          <label :for="'task_' + i">
            <strong>{{ todo.name }}&nbsp;<time datetime="2010-07-26T23:42+03:00">({{ todo.completionDate }})</time></strong>
          </label>
        </span>
        <button class="watch" @click="todo.onDisplay = !todo.onDisplay">&#128269;</button>
      </div>

      <div :class="['desc', {completed: todo.completed, show: todo.onDisplay}]">
        {{ todo.desc }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      todoList: [
        {
          name: 'Доделать домашнее задание №3',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '02-11-2021',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Сделать домашнее задание №4',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '05-11-2021',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Закончить Onix front-end Intership',
          desc: 'Получить диплом(грамоту)',
          completionDate: '31-12-2021',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Попасть в onix team',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '31-01-2022',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Получить offer',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '15-01-2022',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Пройти испытательный срок',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '15-04-2022',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Договориться о высокой ЗП',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '10-01-2022',
          completed: false,
          onDisplay: false
        },
        {
          name: 'Полноценно приступить к работе',
          desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
          completionDate: '10-01-2022',
          completed: false,
          onDisplay: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    margin-top: 30px;

    li{
      border: 1px solid #ccc;
      padding: .5rem 2rem;
      margin-bottom: 1rem;
      transition: all .3s;

      .li{
        display: flex;
        justify-content: space-between;
        align-items: center;

        span{
          display: flex;
        }

        input{
          margin-right: 1rem;
        }

        strong{}

        time{
          text-decoration: underline;
        }

        .watch{
          margin-left: 15px;
          padding: 3px 5px;
          border: 1px solid #ccc;
        }

        .done{
          text-decoration: line-through;
        }
      }

      .desc{
        display: none;
        flex-basis:100%;
        background: #eaeaea;
        margin: 15px 0 10px;
        padding: 10px;
        line-height: 16px;

        &.completed{
          transition: all .3s;
          opacity: .5;
        }

        &.show{
          display: block;
        }
      }
    }
  }
</style>

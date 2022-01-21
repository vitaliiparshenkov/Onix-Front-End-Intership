import {Module} from 'vuex';
import {StatusEnum, TodoInterface} from '@/types/task.interface';

const store: Module<any, any> = {
  namespaced: true,

  state: {
    todoList: [
      {
        taskId: 1,
        name: 'Доделать домашнее задание №3',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '11/17/2021',
        completionDate: '11/22/2021',
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 2,
        name: 'Сделать домашнее задание №4',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '11/01/2021',
        completionDate: '11/05/2021',
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 3,
        name: 'Закончить Onix front-end Intership',
        desc: 'Получить диплом(грамоту)',
        createDate: '12/26/2021',
        completionDate: '12/31/2021',
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 4,
        name: 'Попасть в onix team',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '01/26/2022',
        completionDate: '01/31/2022',
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 5,
        name: 'Получить offer',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '01/10/2022',
        completionDate: '01/15/2022',
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 6,
        name: 'Пройти испытательный срок',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '04/15/2022',
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 7,
        name: 'Договориться о высокой ЗП',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '01/05/2022',
        completionDate: '01/10/2022',
        show: false,
        status: StatusEnum.Inprogress,
      },
      {
        taskId: 8,
        name: 'Полноценно приступить к работе',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        createDate: '02/05/2022',
        completionDate: '02/10/2022',
        show: false,
        status: StatusEnum.Todo,
      },
    ] as TodoInterface[],
  },

  getters: {
    filterTodo: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Todo);
    },
    filterInprogres: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Inprogress);
    },
    filterDone: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Done);
    },

    getCountTodos: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Todo).length;
    },
    getCountInprogress: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Inprogress).length;
    },
    getCountDones: (state) => {
      return state.todoList.filter((todo: TodoInterface) => todo.status === StatusEnum.Done).length;
    },
  },

  mutations: {
    addTodo(state, payload) {
      state.todoList.push(payload);
    },

    modifyTodo(state, {id, task}) {
      state.todoList[id] = task;
    },

    removeTodo(state, payload) {
      state.todoList.splice(payload, 1);
    },
  },

  actions: {
    modifyTodo(context, data) {
      context.commit('modifyTodo', data);
    },
    // addTodo({commit}, data) {
    //   commit('addTodo', data);
    // },
  },
};

export default store;

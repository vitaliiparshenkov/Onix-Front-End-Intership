import { createStore } from 'vuex';
import { StatusEnum } from '@/types/task.interface';
import messagesStore from '@/store/modules/messages.ts';
import VuexPersist from 'vuex-persist';
const vuexLocal = new VuexPersist({
    // key: 'todoList',
    storage: window.localStorage,
});
export default createStore({
    state: {
        todoList: [
            {
                taskId: 1,
                name: 'Доделать домашнее задание №3',
                desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
                // completionDate: new Date('11/22/2021'),
                completionDate: '11/22/2021',
                show: false,
                status: StatusEnum.Done,
            },
            {
                taskId: 2,
                name: 'Сделать домашнее задание №4',
                desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
                // completionDate: new Date('11/05/2021'),
                completionDate: '11/05/2021',
                show: false,
                status: StatusEnum.Todo,
            },
            {
                taskId: 3,
                name: 'Закончить Onix front-end Intership',
                desc: 'Получить диплом(грамоту)',
                completionDate: '12/31/2021',
                show: false,
                status: StatusEnum.Todo,
            },
            {
                taskId: 4,
                name: 'Попасть в onix team',
                desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
                completionDate: '01/31/2022',
                show: false,
                status: StatusEnum.Todo,
            },
            {
                taskId: 5,
                name: 'Получить offer',
                desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
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
                completionDate: '01/10/2022',
                show: false,
                status: StatusEnum.Inprogress,
            },
            {
                taskId: 8,
                name: 'Полноценно приступить к работе',
                desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
                completionDate: '02/10/2022',
                show: false,
                status: StatusEnum.Todo,
            },
        ],
    },
    getters: {
        filterTodo: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Todo);
        },
        filterInprogres: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Inprogress);
        },
        filterDone: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Done);
        },
        getCountTodos: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Todo).length;
        },
        getCountInprogress: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Inprogress).length;
        },
        getCountDones: (state) => {
            return state.todoList.filter((todo) => todo.status === StatusEnum.Done).length;
        },
    },
    mutations: {
        addTodo(state, payload) {
            state.todoList.push(payload);
        },
        modifyTodo(state, { id, task }) {
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
    },
    modules: {
        messages: messagesStore,
    },
    plugins: [vuexLocal.plugin],
});
//# sourceMappingURL=index.js.map
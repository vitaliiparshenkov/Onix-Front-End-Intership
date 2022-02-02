import { StatusEnum } from '@/types/task.interface';
import { TaskService } from '@/service/taskApi';
const store = {
    namespaced: true,
    state: {
        // todoList: [
        //   {
        //     taskId: 1,
        //     name: 'Доделать домашнее задание №3',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '11/17/2021',
        //     completionDate: '11/22/2021',
        //     show: false,
        //     status: StatusEnum.Done,
        //   },
        //   {
        //     taskId: 2,
        //     name: 'Сделать домашнее задание №4',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '11/01/2021',
        //     completionDate: '11/05/2021',
        //     show: false,
        //     status: StatusEnum.Todo,
        //   },
        //   {
        //     taskId: 3,
        //     name: 'Закончить Onix front-end Intership',
        //     desc: 'Получить диплом(грамоту)',
        //     createDate: '12/26/2021',
        //     completionDate: '12/31/2021',
        //     show: false,
        //     status: StatusEnum.Todo,
        //   },
        //   {
        //     taskId: 4,
        //     name: 'Попасть в onix team',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '01/26/2022',
        //     completionDate: '01/31/2022',
        //     show: false,
        //     status: StatusEnum.Todo,
        //   },
        //   {
        //     taskId: 5,
        //     name: 'Получить offer',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '01/26/2022',
        //     completionDate: '02/15/2022',
        //     show: false,
        //     status: StatusEnum.Done,
        //   },
        //   {
        //     taskId: 6,
        //     name: 'Пройти испытательный срок',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '04/10/2022',
        //     completionDate: '04/15/2022',
        //     show: false,
        //     status: StatusEnum.Done,
        //   },
        //   {
        //     taskId: 7,
        //     name: 'Договориться о высокой ЗП',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '01/05/2022',
        //     completionDate: '01/10/2022',
        //     show: false,
        //     status: StatusEnum.Inprogress,
        //   },
        //   {
        //     taskId: 8,
        //     name: 'Полноценно приступить к работе',
        //     desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        //     createDate: '02/05/2022',
        //     completionDate: '02/10/2022',
        //     show: false,
        //     status: StatusEnum.Todo,
        //   },
        // ] as TodoInterface[],
        todoList: [],
        completedTask: 0,
        openTask: 0,
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
        getCountOpenTasks: (state, getters) => {
            return state.todoList.length - getters.getCountDones;
        },
    },
    mutations: {
        ADD_TODO(state, payload) {
            // state.todoList.push(payload);
            return TaskService.addNewTask(payload);
        },
        MODIFY_TODO(state, { id, task }) {
            state.todoList[id] = task;
        },
        REMOVE_TODO(state, payload) {
            state.todoList.splice(payload, 1);
        },
        SET_COMPLETED_TASK(state, payload) {
            state.completedTask = payload;
        },
        SET_OPEN_TASK(state, payload) {
            state.openTask = payload;
        },
    },
    actions: {
        AC_GET_TASKS({ commit }) {
            return TaskService.getTasks().then((result) => {
                if (result) {
                    commit('SET_COMPLETED_TASK', result.completed);
                    commit('SET_OPEN_TASK', result.open);
                    return result.tasksList;
                }
            });
        },
        AC_GET_TASK_BY_ID(context, data) {
            return TaskService.getTaskById(data);
        },
        AC_DELETE_TASKS(context, data) {
            return TaskService.deleteTasks(data);
        },
        AC_ADD_TODO(context, data) {
            return TaskService.addNewTask(data);
        },
        AC_MODIFY_TODO(context, data) {
            return TaskService.modifyTask(data);
        },
    },
};
export default store;
//# sourceMappingURL=todos.js.map
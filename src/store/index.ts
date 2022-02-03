import {createStore} from 'vuex';
import messagesStore from '@/store/modules/messages.ts';
import todosStore from '@/store/modules/todos.ts';
import VuexPersist from 'vuex-persist';

const vuexLocal = new VuexPersist({
  // key: 'todoList',
  storage: window.localStorage,
});

export default createStore({
  state: {
    notificationsCount: '~',
    showStats: false,
  },

  getters: {},

  mutations: {
    modifyNotofis(state, payload) {
      state.notificationsCount = payload;
    },

    modifyShowStats(state, payload) {
      state.showStats = payload;
    },
  },

  actions: {},

  modules: {
    messages: messagesStore,
    todos: todosStore,
  },

  // plugins: [vuexLocal.plugin],
});

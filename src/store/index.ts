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
  },

  getters: {},

  mutations: {
    modifyNotofis(state, payload) {
      state.notificationsCount = payload;
    },
  },

  actions: {},

  modules: {
    messages: messagesStore,
    todos: todosStore,
  },

  plugins: [vuexLocal.plugin],
});

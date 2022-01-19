import {Module} from 'vuex';
import {MessageInterface} from '@/types/activity.interface.ts';

const store: Module<any, any> = {
  namespaced: true,

  state: {
    MessageList: [
      {
        status: 'check',
        message: 'Darika Samak mark sa done Listing on Product Hunt so that we can reach as many potential users',
        time: '8:40 PM',
      },
      {
        status: 'msg',
        message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        time: '7:32 PM',
        answer:
          'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      },
      {
        status: 'download',
        message: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        time: '6:02 PM',
        imageList: ['img-1.png', 'foto_2.jpg', 'foto_3.jpg', 'img-4.png'],
      },
    ] as MessageInterface[],
  },

  getters: {},

  mutations: {},

  actions: {},
};

export default store;

// import ApiService from '@/service/api.ts';

import {ApiService} from '@/service/api';
import {AxiosRequestConfig} from 'axios';

const apiUrls = {
  tasks: 'tasks',
};

export const TaskService = {
  getTasks() {
    return ApiService.get(apiUrls.tasks);
  },

  getTaskById(config: AxiosRequestConfig) {
    return ApiService.get(apiUrls.tasks, config);
  },

  addNewTask(data: any) {
    return ApiService.post(apiUrls.tasks, data);
  },

  modifyTask(data: any) {
    return ApiService.put(apiUrls.tasks + '/' + data.id, data.task);
  },

  deleteTasks(taskId: number) {
    return ApiService.delete(`${apiUrls.tasks}/${taskId}`);
    // return ApiService.delete(`${apiUrls.tasks}/8`);
  },
};

// import ApiService from '@/service/api.ts';
import { ApiService } from '@/service/api';
const apiUrls = {
    tasks: 'tasks',
};
export const TaskService = {
    getTasks() {
        return ApiService.get(apiUrls.tasks);
    },
    getTaskById(config) {
        return ApiService.get(apiUrls.tasks, config);
    },
    addNewTask(data) {
        return ApiService.post(apiUrls.tasks, data);
    },
    modifyTask(data) {
        return ApiService.put(apiUrls.tasks + '/' + data.id, data.task);
    },
    deleteTasks(taskId) {
        return ApiService.delete(`${apiUrls.tasks}/${taskId}`);
        // return ApiService.delete(`${apiUrls.tasks}/8`);
    },
};
//# sourceMappingURL=taskApi.js.map
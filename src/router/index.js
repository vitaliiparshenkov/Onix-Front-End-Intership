import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'main',
        redirect: { name: 'tasks' },
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('../views/Activity.vue'),
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: () => import('../views/Tasks.vue'),
    },
    {
        path: '/kanban',
        name: 'kanban',
        component: () => import('../views/Kanban.vue'),
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/Calendar.vue'),
    },
    {
        path: '/files',
        name: 'files',
        component: () => import('../views/Files.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        // path: '*',
        name: 'not-found',
        component: () => import('../views/404.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
//# sourceMappingURL=index.js.map
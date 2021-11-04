import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'root',
        redirect: { name: 'Tasks' },
    },
    {
        path: '/activity',
        name: 'Activity',
        // component: Activity
        component: () => import(/* webpackChunkName: "about" */ '../views/Activity.vue'),
    },
    {
        path: '/tasks',
        name: 'Tasks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue'),
    },
    {
        path: '/kanban',
        name: 'Kanban',
        component: () => import(/* webpackChunkName: "about" */ '../views/Kanban.vue'),
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
    },
    {
        path: '/files',
        name: 'Files',
        component: () => import(/* webpackChunkName: "about" */ '../views/Files.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
//# sourceMappingURL=index.js.map
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import VCalendar from 'v-calendar';
// import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import '@/assets/scss/style.scss';
import '@/assets/scss/responsive.scss';
createApp(App)
    // .use(VCalendar, {})
    // .component('Calendar', Calendar)
    // .component('DatePicker', DatePicker)
    .use(store)
    .use(router)
    .mount('#app');
//# sourceMappingURL=main.js.map
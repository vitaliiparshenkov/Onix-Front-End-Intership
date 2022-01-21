import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed, ref} from 'vue';
import {CurrentUserInterface} from '@/types/user.interface.ts';

export default function useTheSidebar() {
  const store = useStore();
  const router = useRouter();

  const currentUser: CurrentUserInterface = {
    name: 'Jean Gonzales',
    position: 'Product Owner',
    avatar: require('@/assets/foto_1.jpg'),
  };
  const showStats = ref(false);
  const showBurgerMenu = ref(false);

  const notificationsCount = computed(() => {
    return store.state.notificationsCount;
  });
  const completedTasks = computed(() => {
    return store.getters['todos/getCountDones'];
  });
  const openTasks = computed(() => {
    return store.getters['todos/getCountOpenTasks'];
  });

  const showBurger = () => {
    if (showStats.value) {
      showStats.value = !showStats.value;
    }
    showBurgerMenu.value = !showBurgerMenu.value;
  };

  const showStatistic = () => {
    showStats.value = !showStats.value;
    store.commit('modifyShowStats', showStats.value);
  };

  const goTaskPage = () => {
    router.push({name: 'tasks'});
  };

  return {
    currentUser,
    showStats,
    showBurgerMenu,
    notificationsCount,
    completedTasks,
    openTasks,
    showBurger,
    showStatistic,
    goTaskPage,
  };
}

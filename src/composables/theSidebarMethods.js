import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default function theSidebarMethods(showStats, showBurgerMenu) {
    const store = useStore();
    const router = useRouter();
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
        router.push({ name: 'tasks' });
    };
    return {
        showBurger,
        showStatistic,
        goTaskPage,
    };
}
//# sourceMappingURL=theSidebarMethods.js.map
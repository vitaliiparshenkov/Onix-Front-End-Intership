<template lang="pug">
aside
  .projectus_list
    a.projectus(href="/")
      img(src="@/assets/Logo@3x.svg" alt="projectus" width="22" height="20")
      h3 projectus
    a.search(href="#")

    #burger_container
      #burger_menu(@click="showBurger" :class="{change: showBurgerMenu}")
        .line1
        .line2
        .line3

      .header_menu(:class="{visible: showBurgerMenu}")
        .navbar
          router-link(tag="li" active-class="active" class="navbar-item" :to="{name: 'tasks'}" @click="showBurger")
            a Tasks
          router-link(tag="li" active-class="active" class="navbar-item" :to="{name: 'kanban'}" @click="showBurger")
            a Kanban
          router-link(tag="li" active-class="active" class="navbar-item" :to="{name: 'activity'}" @click="showBurger")
            a Activity
          router-link(tag="li" active-class="active" class="navbar-item" :to="{name: 'calendar'}" @click="showBurger")
            a Calendar
          router-link(tag="li" active-class="active" class="navbar-item" :to="{name: 'files'}" @click="showBurger")
            a Files

  .profile
    .profile_inner
      .logo_sidebar
        img(:src="currentUser.avatar" :alt="currentUser.avatar" height="48" width="48")
      .info
        p.name {{ currentUser.name }}
        p.position {{ currentUser.position }}

    .dots
      .dots_inner

    #indicator(@click.prevent="showStatistic")
      a#down-inner(href="#")
        i(:class="['fas', 'fa-angle-double-down', {change: showStats}]")

  div(:class="['together', {show: showStats}]")
    .statistic
      .complete
        h2 {{ completedTasks }}
        p(@click="changeCompletedTasks") Completed Tasks
      .open
        h2 {{ openTasks }}
        p(@click="goTaskPage")
          | Open Tasks
    nav.sidebar_menu
      p.menu menu
      ul
        li.sidebar_menu_item
          a(href="#") Home
        li.sidebar_menu_item
          a(href="#") My Tasks
        li.sidebar_menu_item
          a(href="#") Notifications
            span.number {{ notificationsCount }}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import useTheSidebar from '../composables/useTheSidebar';

export default defineComponent({
  name: 'sidebar',

  setup() {
    const {
      currentUser,
      showStats,
      showBurgerMenu,
      notificationsCount,
      completedTasks,
      openTasks,
      showBurger,
      showStatistic,
      goTaskPage,
    } = useTheSidebar();

    return {
      notificationsCount,
      completedTasks,
      currentUser,
      openTasks,
      showStats,
      showBurgerMenu,
      showBurger,
      showStatistic,
      goTaskPage,
    };
  },
});
</script>

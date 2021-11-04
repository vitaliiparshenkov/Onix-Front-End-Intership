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
          router-link(tag="li" active-class="active" class="navbar-item" :to="`/tasks`" @click="showBurger")
            a Tasks
          router-link(tag="li" active-class="active" class="navbar-item" :to="'/kanban'" @click="showBurger")
            a Kanban
          router-link(tag="li" active-class="active" class="navbar-item" :to="'/activity'" @click="showBurger")
            a Activity
          router-link(tag="li" active-class="active" class="navbar-item" :to="'/calendar'" @click="showBurger")
            a Calendar
          router-link(tag="li" active-class="active" class="navbar-item" :to="'/files'" @click="showBurger")
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
        p Open Tasks
    nav.sidebar_menu
      p.menu menu
      ul
        li.sidebar_menu_item
          a(href="#") Home
        li.sidebar_menu_item
          a(href="#") My Tasks
        li.sidebar_menu_item
          a(href="#") Notifications
            span.number(@changeNotifi="Notifications = $event") {{ notifications }}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {CurrentUserInterface} from '@/types/user.interface';
export default defineComponent({
  data() {
    return {
      completedTasks: 107,
      openTasks: 3,
      currentUser: {
        name: 'Jean Gonzales',
        position: 'Product Owner',
        avatar: require('@/assets/foto_1.jpg'),
      } as CurrentUserInterface,
      showStats: false,
      showBurgerMenu: false,
    };
  },
  name: 'sidebar',
  props: ['notifications'],
  emits: ['lockWrapper'],
  methods: {
    changeCompletedTasks() {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (this.openTasks > 0) {
          this.completedTasks++;
          this.openTasks--;
        } else {
          alert("Sorry, but you were carried away by your work and did not see that you don't have open projects.");
        }
      }
    },
    showStatistic() {
      this.showStats = !this.showStats;
      this.$emit('lockWrapper', this.showStats);
    },
    showBurger() {
      if (this.showStats) {
        this.showStats = !this.showStats;
      }
      this.showBurgerMenu = !this.showBurgerMenu;
    },
  },
});
</script>

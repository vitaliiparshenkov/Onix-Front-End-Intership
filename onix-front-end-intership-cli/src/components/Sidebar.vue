<template>
  <aside>
    <div class="projectus_list">
      <a href="/" class="projectus">
        <img src="@/assets/Logo@3x.svg" alt="projectus" width="22" height="20">
        <h3>projectus</h3>
      </a>
      <a href="#" class="search"></a>

      <div id="burger_container">
        <div id="burger_menu" @click="showBurger" :class="{change: showBurgerMenu}">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>

        <nav class="header_menu" :class="{visible: showBurgerMenu}">
          <ul class="navbar">
            <router-link tag="li" active-class="active" class="navbar-item" :to="`/tasks`" @click="showBurger"><a>Tasks</a></router-link>
            <router-link tag="li" active-class="active" class="navbar-item" :to="'/kanban'" @click="showBurger"><a>Kanban</a></router-link>
            <router-link tag="li" active-class="active" class="navbar-item" :to="'/activity'" @click="showBurger"><a>Activity</a></router-link>
            <router-link tag="li" active-class="active" class="navbar-item" :to="'/calendar'" @click="showBurger"><a>Calendar</a></router-link>
            <router-link tag="li" active-class="active" class="navbar-item" :to="'/files'" @click="showBurger"><a>Files</a></router-link>
          </ul>
        </nav>
      </div>
    </div>

    <div class="profile">
      <div class="profile_inner">
        <div class="logo_sidebar">
          <img :src="currentUser.avatar" :alt="currentUser.avatar" height="48" width="48">
        </div>
        <div class="info">
          <p class="name">{{ currentUser.name }}</p>
          <p class="position">{{ currentUser.position }}</p>
        </div>
      </div>

      <div class="dots">
        <div class="dots_inner"></div>
      </div>

      <div id="indicator" @click.prevent="showStatistic">
        <a id="down-inner" href="#"><i :class="['fas', 'fa-angle-double-down', {change: showStats}]"></i></a>
      </div>
    </div>

    <div :class="['together', {show: showStats}]">
      <div class="statistic">
        <div class="complete">
          <h2 >{{ completedTasks }}</h2>
          <p @click="changeCompletedTasks">Completed Tasks</p>
        </div>
        <div class="open">
          <h2>{{ openTasks }}</h2>
          <p>Open Tasks</p>
        </div>
      </div>
      <nav class="sidebar_menu">
        <p class="menu">menu</p>
        <ul>
          <li class="sidebar_menu_item"><a href="#">Home</a></li>
          <li class="sidebar_menu_item"><a href="#">My Tasks</a></li>
          <li class="sidebar_menu_item">
            <a href="#">Notifications <span class="number" @changeNotifi="Notifications = $event">{{ notifications }}</span></a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      completedTasks: 107,
      openTasks: 3,
      currentUser: {
        name: 'Jean Gonzales',
        position: 'Product Owner',
        avatar: require('@/assets/foto_1.jpg')
      },
      showStats: false,
      showBurgerMenu: false
    }
  },
  name: 'sidebar',
  props: ['notifications'],
  methods: {
    changeCompletedTasks () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (this.openTasks > 0) {
          this.completedTasks++
          this.openTasks--
        } else {
          alert('Sorry, but you were carried away by your work and did not see that you don\'t have open projects.')
        }
      }
    },
    showStatistic () {
      this.showStats = !this.showStats
      this.$emit('lockWrapper', this.showStats)
    },
    showBurger () {
      if (this.showStats) {
        this.showStats = !this.showStats
      }

      this.showBurgerMenu = !this.showBurgerMenu
    }
  }
}
</script>

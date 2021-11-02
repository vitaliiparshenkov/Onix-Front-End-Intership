<template>
  <header>
    <div class="logo_header">
      <div class="logo_header_left">
        <a class="logo_link" href="/">
          <img src="@/assets/Shapes@2x.png" alt="website logo" width="40" height="40">
          <h1>Website Redesign</h1>
        </a>
        <div class="dots">
          <div class="dots_inner"></div>
        </div>
      </div>

      <div class="logo_header_right">
        <div class="profile_list">
          <a href="#" v-for="(icon, index) of headerIconList" :key="index">
            <img :src="require('@/assets/' + icon)" :alt="icon" width="30" height="30">
          </a>
        </div>
        <a class="share" href="#">Share</a>
        <a class="chat" href="#"> Chat</a>
      </div>
    </div>

    <nav class="header_menu">
      <ul class="navbar">
        <router-link tag="li" active-class="active" class="navbar-item" :to="`/tasks`"><a>Tasks</a></router-link>
        <router-link tag="li" active-class="active" class="navbar-item" :to="'/kanban'"><a>Kanban</a></router-link>
        <router-link tag="li" active-class="active" class="navbar-item" :to="'/activity'"><a>Activity</a></router-link>
        <router-link tag="li" active-class="active" class="navbar-item" :to="'/calendar'"><a>Calendar</a></router-link>
        <router-link tag="li" active-class="active" class="navbar-item" :to="'/files'"><a>Files</a></router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      headerIconList: ['foto_1.jpg', 'foto_2.jpg', 'foto_3.jpg']
    }
  }
}
</script>

<style>

</style>

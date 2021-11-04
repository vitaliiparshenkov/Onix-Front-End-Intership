<template lang="pug">
header
  .logo_header
    .logo_header_left
      a.logo_link(href="/")
        img(src="@/assets/Shapes@2x.png" alt="website logo" width="40" height="40")
        h1 Website Redesign
      .dots
        .dots_inner

    .logo_header_right
      .profile_list
        a(href="#" v-for="(icon, index) of headerIconList" :key="index")
          img(:src="require('@/assets/' + icon)" :alt="icon" width="30" height="30")
      a.share(href="#") Share
      a.chat(href="#") &nbsp;Chat

  nav.header_menu
    ul.navbar
      router-link(tag="li" active-class="active" class="navbar-item" :to="`/tasks`")
        a Tasks
      router-link(tag="li" active-class="active" class="navbar-item" :to="'/kanban'")
        a Kanban
      router-link(tag="li" active-class="active" class="navbar-item" :to="'/activity'")
        a Activity
      router-link(tag="li" active-class="active" class="navbar-item" :to="'/calendar'")
        a Calendar
      router-link(tag="li" active-class="active" class="navbar-item" :to="'/files'")
        a Files
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  data() {
    return {
      headerIconList: ['foto_1.jpg', 'foto_2.jpg', 'foto_3.jpg'] as Array<string>,
    };
  },
});
</script>

<style></style>

<template>
  <div :class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event">
    <div class="wrapper_container">
      <div class="sidebar">
        <Sidebar :notifications="notifications" />
      </div>

      <div class="content">
        <Header />
        <main>
          <router-view @changeNotifis="notifications = $event" />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

export default {
  data () {
    return {
      notifications: '~',
      showStats: false
    }
  },
  name: 'app',
  components: {
    Sidebar,
    Header
  },
  methods: {
    // changeNotifis (id) {
    //   this.notifications = id;
    //   // console.log(id)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

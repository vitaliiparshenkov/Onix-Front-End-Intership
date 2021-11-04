<template lang="pug">
div(:class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event")
	.wrapper_container
		.sidebar
			Sidebar(:notifications="notifications")

		.content
			Header
			main
				router-view(@changeNotifis="notifications = $event")
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';

export default {
  data() {
    return {
      notifications: '~',
      showStats: false,
    };
  },
  name: 'app',
  components: {
    Sidebar,
    Header,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

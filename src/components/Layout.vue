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
import {defineComponent} from 'vue';

export default defineComponent({
  data() {
    return {
      notifications: '~',
      showStats: false,
    };
  },
  name: 'layout',
  components: {
    Sidebar,
    Header,
  },
});
</script>

<style scoped lang="scss"></style>

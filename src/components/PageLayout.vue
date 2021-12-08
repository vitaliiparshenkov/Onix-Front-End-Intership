<template lang="pug">
div(:class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event")
	.wrapper_container
		.sidebar
			TheSidebar(:notifications="notifications")

		.content
			TheHeader
			main
				router-view(@changeNotifis="notifications = $event")
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import TheHeader from '@/components/TheHeader.vue';
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
    TheSidebar,
    TheHeader,
  },
});
</script>

<style scoped lang="scss"></style>

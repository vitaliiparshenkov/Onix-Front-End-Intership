<template lang="pug">
div(:class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event")
	.wrapper_container
		.sidebar
			TheSidebar

		.content
			TheHeader
			main
				router-view
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import TheHeader from '@/components/TheHeader.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  data() {
    return {
      showStats: false,
    };
  },

  name: 'layout',

  components: {
    TheSidebar,
    TheHeader,
  },

  mounted() {
    this.$store.commit('modifyNotofis', '~');
  },
});
</script>

<style scoped lang="scss"></style>

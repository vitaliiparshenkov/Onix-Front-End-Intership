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
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const showStats = ref(false);
    const store = useStore();

    onMounted(() => {
      store.commit('modifyNotofis', '~');
    });

    return {
      showStats,
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

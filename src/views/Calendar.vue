<template lang="pug">
coming-soon
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ComingSoon from '@/components/ComingSoon.vue';
export default defineComponent({
  data() {
    return {};
  },
  name: 'calendar',
  components: {
    'coming-soon': ComingSoon,
    // ComingSoon: () => import('@/components/ComingSoon.vue'),
  },
});
</script>

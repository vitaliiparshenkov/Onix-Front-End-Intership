<template lang="pug">
h1 Image list

ul.list
  li.list-item(v-for="imgName of imageList") {{imgName}}

</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const imageList = computed(() => {
      return store.getters['messages/getImageList'];
    });

    return {
      imageList,
    };
  },

  name: 'files',
});
</script>

<style lang="scss" scoped>
h1 {
  border-bottom: 1px solid #cccccc;
}

.list {
  margin: 20px 0 0 30px;

  .list-item {
    list-style-type: square;
    line-height: 20px;
  }
}
</style>

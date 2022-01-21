<template lang="pug">
h1 Image list

ul.list
  li.list-item(v-for="imgName of imageList") {{imgName}}

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapState, mapGetters} from 'vuex';

export default defineComponent({
  data() {
    return {};
  },

  name: 'files',

  emits: {},

  components: {},

  methods: {},

  computed: {
    ...mapState({
      MessageList(state: any): any {
        return state.messages.MessageList;
      },
    }),

    ...mapGetters('messages', {imageList: 'getImageList'}),
  },
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

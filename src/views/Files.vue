<template lang="pug">
h1 Image list

ul.list
  li.list-item(v-for="imgName of imageList") {{imgName}}

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapState} from 'vuex';

export default defineComponent({
  data() {
    return {};
  },

  name: 'files',

  emits: {
    'change-notifis': null,
    'remove-task': null,
    'save-task': null,
  },

  components: {},

  methods: {},

  computed: {
    ...mapState({
      MessageList(state: any): any {
        return state.messages.MessageList;
      },
    }),

    imageList() {
      const imgList: string[] = [];
      // const imgList: Array<string> = [];
      for (let msgItem of this.MessageList) {
        if ('imageList' in msgItem) {
          for (let imgItem of msgItem.imageList) {
            imgList.push(imgItem);
          }
        }
      }
      return imgList;
    },
  },
});
</script>

<style lang="scss" scoped>
h1{
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
